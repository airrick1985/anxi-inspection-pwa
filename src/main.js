import { createApp } from 'vue'
import App from './App.vue'
import router from './router'         // <- 載入我們剛剛建立的 router
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'

createApp(App)
  .use(router)
  .mount('#app')
