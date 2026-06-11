import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import { viteMockServe } from 'vite-plugin-mock'

export default defineConfig({
  plugins: [vueDevTools(), viteMockServe()],
})
