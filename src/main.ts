import '@/assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

//如果没有特别指明文件名，默认导入的是 plugins/index 文件（如果存在）
import setupPlugins from "@/plugins";

//全局组件的导入StuDemo4
import StuDemo4 from '@/views/day20241212/StuDemo4.vue';
import { h } from 'vue'




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

app.use(createPinia())
app.use(router)
app.use(setupPlugins);

app.mount('#app')
