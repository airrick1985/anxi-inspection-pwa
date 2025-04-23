// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// 你的元件
import LoginPage           from '../components/LoginPage.vue'
import SiteSelectionPage   from '../components/SiteSelectionPage.vue'
import HomePage            from '../components/HomePage.vue'
import InspectionPage      from '../components/InspectionPage.vue'
import InspectionFlowPage  from '../components/InspectionFlowPage.vue'

const routes = [
  // 1. 登入頁面
  { path: '/login',  name: 'Login',  component: LoginPage },
  // 2. 選擇案場
  { path: '/sites',  name: 'Sites',  component: SiteSelectionPage },
  // 3. 首頁（功能入口）
  { path: '/',       name: 'Home',   component: HomePage },
  // 4. 驗屋選擇頁面
  { path: '/select', name: 'Select', component: InspectionPage },
  // 5. 驗屋流程頁面
  { path: '/flow',   name: 'Flow',   component: InspectionFlowPage },

  // 6. 任何不認識的路徑自動導回 /login
  { path: '/:pathMatch(.*)*', redirect: '/login' }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 全域導航守衛：如果沒登入（sessionStorage 無 user），就跳到 /login
router.beforeEach((to, from, next) => {
  const isLoggedIn = !!sessionStorage.getItem('user')
  if (to.name !== 'Login' && !isLoggedIn) {
    next({ name: 'Login' })
  } else if (to.name === 'Login' && isLoggedIn) {
    next({ name: 'Sites' })
  } else {
    next()
  }
})

export default router
