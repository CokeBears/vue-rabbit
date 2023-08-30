//将所有组件进行全局化注册
//通过插件方式
import ImageView from './ImageView/index.vue'
import Sku from './XtxSku/index.vue'

export const componentPlugin = {
    install(app){
        //app.component('组件名',组件配置对象)
        app.component('XtxImageView',ImageView)
        app.component('XtxSku',Sku)
    }
}