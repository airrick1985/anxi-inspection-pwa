<!-- src/components/BottomNav.vue -->
<template>
    <!-- 這裡之後放你的底部導覽 -->
    <nav class="tab-bar nav nav-pills nav-justified">
      <a class="nav-link active" href="#"><i class="bi bi-person"></i><br>人員</a>
      <a class="nav-link" href="#"><i class="bi bi-house"></i><br>記錄</a>
      <a class="nav-link" href="#"><i class="bi bi-plus-circle"></i><br>新增</a>
      <a class="nav-link" href="#"><i class="bi bi-image"></i><br>照片</a>
      <a class="nav-link" href="#"><i class="bi bi-three-dots"></i><br>更多</a>
    </nav>
  </template>
  
  <script setup>
  // 如果將來要接 props/emits，寫在這裡
  </script>
  
  <style scoped>
  .tab-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    box-shadow: 0 -1px 5px rgba(0,0,0,0.1);
    z-index: 1000;
  }
  .tab-bar .nav-link { color: #777; }
  .tab-bar .nav-link.active { color: #005a8d; }
  </style>
  