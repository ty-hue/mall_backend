import { createApp } from 'vue'
// 重置浏览器样式表
import 'normalize.css'
// 使用公用样式
import '@/assets/css/common.less'
import App from './App.vue'
import pinia from './stores'
import router from './router'
import registerIcons from './global/register-icons.ts'
import 'element-plus/theme-chalk/el-message.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
// 注册element-plus图标组件
app.use(registerIcons)

app.mount('#app')
