import { createApp } from 'vue'
// 重置浏览器样式表
import 'normalize.css'
// 使用公用样式
import '@/assets/css/common.less'
import App from './App.vue'
import store from './stores'
import router from './router'
import registerIcons from './global/register-icons.ts'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'element-plus/theme-chalk/el-message.css'
const app = createApp(App)
app.use(store)
app.use(router)
// 注册element-plus图标组件
app.use(registerIcons)
app.mount('#app')
