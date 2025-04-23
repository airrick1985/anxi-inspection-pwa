<!-- src/components/SiteSelectionPage.vue -->
<template>
    <div class="container py-5">
      <h3 class="mb-4">選擇案場</h3>
      <div class="row g-3">
        <div class="col-6" v-for="site in sites" :key="site">
          <div class="card text-center" @click="selectSite(site)" style="cursor: pointer;">
            <div class="card-body">
              <h5 class="card-title">{{ site }}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    name: 'SiteSelectionPage',
    data() {
      return {
        sites: []
      }
    },
    async created() {
      try {
        // TODO: 換成你的後端 API endpoint
        const res = await axios.get('/api/sites')
        this.sites = res.data.sites || []
      } catch (err) {
        console.error('讀取案場列表失敗', err)
      }
    },
    methods: {
      selectSite(site) {
        // 把選擇的案場存起來
        localStorage.setItem('currentSite', site)
        // 跳到首頁 (我們 router 裡 Home 路徑 name 設為 'Home')
        this.$router.push({ name: 'Home' })
      }
    }
  }
  </script>
  
  <style scoped>
  .card {
    transition: transform .2s;
  }
  .card:hover {
    transform: scale(1.03);
  }
  </style>
  