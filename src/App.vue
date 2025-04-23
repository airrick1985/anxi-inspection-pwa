<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div id="app">
    <!-- 首頁 -->
    <HomePage v-if="page === 'home'" @start="goToInspectionPage" />

    <!-- 驗屋選擇頁面 -->
    <InspectionPage v-if="page === 'select'" @startFlow="goToFlowPage" @back="goToHomePage" />

    <!-- 驗屋流程頁面 -->
    <InspectionFlowPage v-if="page === 'flow'" @backToSelect="goToInspectionPage" />

    <!-- 底部導航 -->
    <BottomNav />
  </div>
</template>

<script>
import HomePage from './components/HomePage.vue';
import InspectionPage from './components/InspectionPage.vue';
import InspectionFlowPage from './components/InspectionFlowPage.vue';
import BottomNav from './components/BottomNav.vue';

export default {
  name: 'App',
  components: {
    HomePage,
    InspectionPage,
    InspectionFlowPage,
    BottomNav
  },
  data() {
    return {
      page: 'home'
    }
  },
  methods: {
    goToHomePage() {
      this.page = 'home';
    },
    goToInspectionPage() {
      this.page = 'select';
    },
    goToFlowPage() {
      this.page = 'flow';
    }
  },
  mounted() {
    // PWA 註冊
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('service-worker.js')
        .then(() => console.log('✅ 安熙驗屋APP 註冊成功'))
        .catch(err => console.error('❌ 註冊失敗:', err));
    }
  }
}
</script>

<style>
body {
  font-family: 'Noto Sans TC', sans-serif;
  background-color: #f4f6f8;
  padding-bottom: 5rem;
}
</style>
