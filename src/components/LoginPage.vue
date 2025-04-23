<template>
    <div class="container py-5" style="max-width: 400px;">
      <h3 class="text-center mb-4">安熙驗屋APP 登入頁面</h3>
  
      <div class="mb-3">
        <label class="form-label">姓名</label>
        <input
          v-model="username"
          type="text"
          class="form-control"
          placeholder="輸入姓名"
        />
      </div>
  
      <div class="form-check mb-3">
        <input
          v-model="remember"
          class="form-check-input"
          type="checkbox"
          id="rememberName"
        />
        <label class="form-check-label" for="rememberName">
          記住姓名
        </label>
      </div>
  
      <div class="mb-3">
        <label class="form-label">密碼</label>
        <input
          v-model="password"
          type="password"
          class="form-control"
          placeholder="輸入密碼"
        />
      </div>
  
      <button class="btn btn-primary w-100" @click="login">
        登入
      </button>
  
      <p v-if="error" class="text-danger mt-2">{{ error }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'LoginPage',
    data() {
      return {
        username: localStorage.getItem('savedName') || '',
        password: '',
        remember: !!localStorage.getItem('savedName'),
        error: ''
      };
    },
    methods: {
      async login() {
        this.error = '';
  
        // 1. 空值檢查
        if (!this.username) {
          this.error = '請輸入姓名';
          return;
        }
        if (!this.password) {
          this.error = '請輸入密碼';
          return;
        }
  
        try {
          // 呼叫後端 API
          const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/login`,
            {
              name: this.username,
              password: this.password
            }
          );
  
          const { status, user, message } = res.data;
  
          if (status === 'no_user') {
            this.error = '查無姓名資料，請與系統管理員聯繫';
          } else if (status === 'wrong_password') {
            this.error = '密碼錯誤，請重新輸入';
          } else if (status === 'authorized') {
            // 記住姓名 or 清除
            if (this.remember) {
              localStorage.setItem('savedName', this.username);
            } else {
              localStorage.removeItem('savedName');
            }
            // 存使用者資料到 sessionStorage
            sessionStorage.setItem('user', JSON.stringify(user));
            // 導到案場選擇頁
            this.$router.push('/sites');
          } else {
            this.error = message || '登入失敗，請稍後再試';
          }
        } catch (e) {
          console.error(e);
          this.error = '登入失敗，請稍後再試';
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Bootstrap 5 already 引入，全域不需要再額外樣式 */
  </style>
  