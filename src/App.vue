<!-- src/App.vue -->
<template>
  <!-- 只要一行，所有路由元件都會顯示在這裡 -->
  <router-view/>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    // PWA Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(() => console.log('✅ Service Worker 註冊成功'))
        .catch(err => console.error('❌ 註冊失敗', err))
    }
  }
}
</script>

<style>
/* 全局樣式可以放這裡 */
body {
  font-family: 'Noto Sans TC', sans-serif;
  background-color: #f4f6f8;
}
</style>
