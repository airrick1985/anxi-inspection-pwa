<template>
    <div class="container py-4">
      <h5 class="text-center mb-4">驗屋流程</h5>
      <form @submit.prevent="saveAndContinue">
        <div class="mb-3">
          <label class="form-label">選擇區域</label>
          <select
            class="form-select"
            v-model="area"
            @change="loadInspectionItems"
          >
            <option>客廳</option>
            <option>廚房</option>
            <option>主臥</option>
            <option>次臥A</option>
            <option>次臥B</option>
            <option>次臥C</option>
            <option>主浴</option>
            <option>次浴</option>
            <option>前陽台</option>
            <option>後陽台</option>
          </select>
        </div>
  
        <div class="mb-3">
          <label class="form-label">檢查項目</label>
          <select class="form-select" v-model="item">
            <option v-for="opt in items" :key="opt">{{ opt }}</option>
          </select>
        </div>
  
        <div class="mb-3">
          <label class="form-label">狀況</label>
          <select class="form-select" v-model="status">
            <option>正常</option>
            <option>異常</option>
            <option>待確認</option>
            <option>未施測</option>
          </select>
        </div>
  
        <div class="mb-3">
          <label class="form-label">上傳照片並標註</label>
          <input
            type="file"
            class="form-control"
            accept="image/*"
            @change="previewAndAnnotate"
          />
          <div class="toolbar mt-3" v-show="showToolbar">
            <input type="color" v-model="color" />
            <input
              type="range"
              v-model="brushSize"
              min="1"
              max="20"
            />
            <button
              type="button"
              class="btn btn-sm btn-outline-secondary"
              @click="setTool('brush')"
            >
              畫筆
            </button>
            <button
              type="button"
              class="btn btn-sm btn-outline-secondary"
              @click="setTool('rect')"
            >
              矩形
            </button>
            <button
              type="button"
              class="btn btn-sm btn-outline-secondary"
              @click="setTool('ellipse')"
            >
              橢圓
            </button>
            <button
              type="button"
              class="btn btn-sm btn-outline-secondary"
              @click="clearAnnotations"
            >
              清除所有註記
            </button>
          </div>
          <div class="mt-2" v-show="showCanvas">
            <canvas ref="annotationCanvas"></canvas>
          </div>
        </div>
  
        <div class="mb-3">
          <label class="form-label">說明</label>
          <textarea
            class="form-control"
            v-model="description"
            rows="3"
          ></textarea>
        </div>
  
        <button type="submit" class="btn btn-success w-100">
          保存並繼續
        </button>
        <button
          type="button"
          class="btn btn-secondary mt-2 w-100"
          @click="$router.back()"
        >
          返回上一頁
        </button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'InspectionFlowPage',
    data() {
      return {
        area: '客廳',
        items: [],
        item: '',
        status: '正常',
        showToolbar: false,
        showCanvas: false,
        color: '#ff0000',
        brushSize: 3,
        tool: 'brush',
        ctx: null,
        initialImageData: null,
        origImageData: null,
        drawing: false,
        startX: 0,
        startY: 0,
        description: ''
      };
    },
    mounted() {
      this.loadInspectionItems();
    },
    methods: {
      loadInspectionItems() {
        if (this.area === '廚房') {
          this.items = ['瓦斯管線', '排油煙機', '流理臺'];
        } else if (this.area === '主浴') {
          this.items = ['馬桶', '水龍頭', '排水孔'];
        } else {
          this.items = ['地板平整', '牆面裂縫', '插座'];
        }
        this.item = this.items[0];
      },
      previewAndAnnotate(e) {
        const file = e.target.files[0];
        if (!file) return;
        const img = new Image();
        img.onload = () => {
          const canvas = this.$refs.annotationCanvas;
          canvas.width = img.width;
          canvas.height = img.height;
          this.ctx = canvas.getContext('2d');
          this.ctx.drawImage(img, 0, 0);
          this.initialImageData = this.ctx.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          );
          this.origImageData = this.initialImageData;
          this.showToolbar = true;
          this.showCanvas = true;
          canvas.onpointerdown = this.pointerDown;
          canvas.onpointermove = this.pointerMove;
          canvas.onpointerup = this.pointerUp;
        };
        img.src = URL.createObjectURL(file);
      },
      pointerDown(e) {
        if (!this.ctx) return;
        this.drawing = true;
        const rect = this.$refs.annotationCanvas.getBoundingClientRect();
        this.startX = e.clientX - rect.left;
        this.startY = e.clientY - rect.top;
        if (this.tool === 'brush') {
          this.ctx.beginPath();
          this.ctx.moveTo(this.startX, this.startY);
        }
      },
      pointerMove(e) {
        if (!this.drawing || !this.ctx) return;
        const rect = this.$refs.annotationCanvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = this.brushSize;
        if (this.tool === 'brush') {
          this.ctx.lineTo(x, y);
          this.ctx.stroke();
          this.origImageData = this.ctx.getImageData(
            0,
            0,
            this.ctx.canvas.width,
            this.ctx.canvas.height
          );
        } else {
          this.ctx.clearRect(
            0,
            0,
            this.ctx.canvas.width,
            this.ctx.canvas.height
          );
          this.ctx.putImageData(this.origImageData, 0, 0);
          if (this.tool === 'rect') {
            this.ctx.strokeRect(
              this.startX,
              this.startY,
              x - this.startX,
              y - this.startY
            );
          } else {
            const rx = Math.abs(x - this.startX) / 2;
            const ry = Math.abs(y - this.startY) / 2;
            const cx = (this.startX + x) / 2;
            const cy = (this.startY + y) / 2;
            this.ctx.beginPath();
            this.ctx.ellipse(cx, cy, rx, ry, 0, 0, 2 * Math.PI);
            this.ctx.stroke();
          }
        }
      },
      pointerUp() {
        if (!this.drawing || !this.ctx) return;
        this.drawing = false;
        this.origImageData = this.ctx.getImageData(
          0,
          0,
          this.ctx.canvas.width,
          this.ctx.canvas.height
        );
      },
      setTool(t) {
        this.tool = t;
        if (this.$refs.annotationCanvas) {
          this.$refs.annotationCanvas.style.cursor = 'crosshair';
        }
      },
      clearAnnotations() {
        if (!this.ctx || !this.initialImageData) return;
        this.ctx.putImageData(this.initialImageData, 0, 0);
        this.origImageData = this.initialImageData;
      },
      saveAndContinue() {
        alert('項目已保存');
        this.$router.push('/');
      }
    }
  };
  </script>
  
  <style scoped>
  .toolbar {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }
  </style>
  