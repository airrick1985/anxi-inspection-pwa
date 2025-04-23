<template>
    <div>
      <nav class="navbar bg-light px-3">
        <span>使用者: {{ username }}</span>
        <button class="btn btn-outline-secondary btn-sm ms-auto" @click="logout">
          <i class="bi bi-box-arrow-right"></i>
        </button>
      </nav>
      <div class="container py-4">
        <h3 class="mb-4">{{ currentSite }} 驗屋功能</h3>
        <div class="row g-4">
          <div class="col-6">
            <div class="card text-center" @click="$router.push('/inspection-records')">
              <div class="card-body">
                <i class="bi bi-journal-check display-4"></i>
                <p class="mt-2">開始驗屋</p>
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="card text-center" @click="$router.push('/inspection-summary')">
              <div class="card-body">
                <i class="bi bi-clipboard-data display-4"></i>
                <p class="mt-2">驗屋記錄總覽</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
  export default {
    name: 'HomePage',
    computed: {
      username() { return localStorage.getItem('savedName') || '訪客' },
      currentSite() { return localStorage.getItem('currentSite') || '未選擇' }
    },
    methods: {
      logout() {
        localStorage.removeItem('savedName')
        localStorage.removeItem('currentSite')
        this.$router.push('/')
      }
    }
  }
  </script>