import '@/styles/common.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { lazyPlugin } from '@/directives'
import { componentPlugin } from '@/components'
import App from './App.vue'
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'



const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
//引入数据持久化插件
pinia.use(piniaPluginPersistedstate)
app.use(router)
app.use(lazyPlugin)
app.use(componentPlugin)
app.mount('#app')


