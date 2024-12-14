<!--
setup 语法糖是什么:
  setup 是 Vue 3 的组合式 API 的核心功能之一，用来定义组件逻辑。它是一种函数，运行在组件实例初始化之前，用于声明响应式数据、计算属性、方法等逻辑。通过 <script setup> 语法糖，我们可以更简洁地使用 setup，避免一些冗余的模板和逻辑代码

setup 语法糖的优点:
  1、更简洁：<script setup> 自动处理了变量声明和模板的绑定逻辑，减少了代码量
  2、提升性能：<script setup> 会在编译阶段优化代码，而不是运行时解析
  3、更直观：所有逻辑都直接在 setup 中声明，无需手动返回，变量和方法可以直接绑定到模板中

setup 语法糖的核心特点：
  1、自动注入模板：在 <script setup> 中定义的变量、方法、响应式数据等，都能直接在模板中使用，无需返回
  2、支持模块化引入：可以直接引入 Vue 的工具函数，比如 ref、reactive、computed 等。
  3、简化了生命周期和组件逻辑：setup 函数自动处理生命周期等逻辑。

普通 setup 与 <script setup> 的区别
  1、<script setup> 不需要显式 return，声明的内容直接暴露给模板。
  2、<script setup> 代码更简洁，变量直接在模板中可用。
-->
<template>
  <div id="wrap">
    <h1>setup 语法糖</h1>
    <p>{{ str }}</p>
    <p>{{ str2 }}</p>
    <button type="button" @click="changeStr">修改str</button>
  </div>
</template>

<script lang="ts">
export default {
  name: 'dayStuDemo6',
}
</script>

<script lang="ts" setup>
import { ref } from 'vue'
// setup中访问this是undefined。
//console.log(this) // undefined

// 普通变量
let str = '我是组合式api的普遍变量'

// 响应式变量
const str2 = ref('我是响应式变量')

const changeStr = () => {
  str2.value = '我是响应变量，我可以出发UI的更新'

  console.log('changeStr')
  str = '我不能响应式显示UI的效果，修改我没用'
  console.log(str)
  fun1()
}

const fun1 = () => {
  console.log('fun1')
}

// setup函数返回的对象中的内容，可直接在模板中使用。
</script>

<style lang="scss"></style>
