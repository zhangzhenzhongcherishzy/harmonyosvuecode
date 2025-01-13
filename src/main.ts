import '@/assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';  //数据持久化插件 pnpm install pinia-plugin-persistedstate

//导入element-plus
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/styles/element/dark/css-vars.scss'

//导入element-plus icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue'
import router from './router'

//全局中使用axios
import axios from 'axios';


//如果没有特别指明文件名，默认导入的是 plugins/index 文件（如果存在）
import setupPermission from '@/plugins'

//全局组件的导入StuDemo4
import StuDemo4 from '@/views/day20241212/StuDemo4.vue';
import { h } from 'vue'

//数据持久化插件 pnpm install pinia-plugin-persistedstate
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)


const app = createApp(App)



/*
app.component：Vue 的 createApp 实例的方法，用于注册全局组件。
  作用：
    1、注册一个全局组件，使得它可以在整个应用的任何模板中使用。
    2、注册时，第一个参数是组件名称（字符串），第二个参数是组件定义对象。
  语法：app.component('组件名', 组件定义)
    组件定义：
      （1）导入.vue 文件组件（如StuDemo4）
      （2）编写一个内联组件定义对象（如下列代码）
*/
// 定义/注册全局组件 MyComponent
app.component('MyComponent3', {
  name: 'MyComponent3',
  // 自定义渲染函数
  render(): unknown {
    // 调用 setup() 中返回的渲染函数
    return h('div', [
      h('h1', '通过vue的h函数自定义渲染'),
      h('p', 'This content is rendered using a render function in setup()'),
      h('button', { onClick: () => alert('Button clicked!') }, '点我')
    ])
  }
})
//注册全局组件StuDemo4
app.component('StuDemo4', StuDemo4)

//使用element-plus
// app.use(ElementPlus)

//导入使用element-plus icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// app.use(createPinia())

//数据持久化插件 pnpm install pinia-plugin-persistedstate
app.use(pinia)

//将axios挂载到全局
app.config.globalProperties.$axios = axios
/*
提供全局 axios：在 main.ts 中，只是挂载了 axios 到 app.config.globalProperties，但并没有通过 Vue 的 provide 提供 $axios，全局通过 provide 注入 $axios
*/
app.provide('$axios', axios);

app.use(router)
app.use(setupPermission);

app.mount('#app')
