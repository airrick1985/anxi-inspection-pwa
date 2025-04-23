import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/anxi-inspection-pwa/',  // ← 這裡
  plugins: [vue()],
  // ...你的 proxy、其他設定
})
