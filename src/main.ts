import { createApp } from 'vue'
import store from './stores'
import VForm3 from 'vform3-builds';
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import './styles/common.scss'
import './assets/css/base.css'
import App from './App.vue'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './assets/css/main.css'
// import './permission'
import Page from '@/components/Page/index.vue'
import 'vform3-builds/dist/designer.style.css'
import * as echarts from 'echarts';
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(ElementPlus as any, {
    locale: zhCn
})
app.use(VForm3)
app.component('Page', Page);
// 可能是版本问题：
// 类型“Pinia”的参数不能赋给类型“Plugin_2”的参数。打包报错
// app.use(createPinia())
app.use(store as any)
app.use(router)
app.config.globalProperties.$echarts = echarts;
app.mount('#app')

