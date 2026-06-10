import { createApp } from 'vue'
// 重置浏览器样式表
import 'normalize.css'
// 使用公用样式
import '@/assets/css/common.less'
import App from './App.vue'
import pinia from './stores'
import router from './router'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
