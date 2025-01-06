// import type {App} from 'vue'
import {setupPermission} from './permission'

/*
install 方法是 Vue 插件的入口点，用于注册插件的功能;当插件被注册时，install 方法接收应用实例 app 作为参数。
可以在 install 方法中进行全局配置、组件注册、指令注册、挂载全局属性等操作

代码解释：
插件对象：export default { install } 是一个插件对象，导出了带有 install 方法的插件。
注册插件：当使用 app.use(setupPermission) 注册插件时，这个 install 方法会被 Vue 自动调用。
功能逻辑：install 方法中调用了 setupPermission()，用于设置路由守卫逻辑。
*/
export default {
  install(){
    //路由守卫方法
    setupPermission()
  }
}
