<!--
!useTemplateRef()
  useTemplateRef 是 Vue Composition API 中的一个辅助函数，用于处理模板引用（template ref）。在 Vue 3 中，ref 允许我们直接访问 DOM 元素或子组件实例。Vue 内部通过模板中的 ref 属性关联这些元素或实例。但在组合式 API 中，我们需要一种便捷的方式来动态操作这些引用，而 useTemplateRef 是一个工具库提供的高级实现，解决了动态模板引用的管理问题
?作用：
  返回一个浅层 ref，其值将与模板中的具有匹配 ref attribute 的元素或组件同步。

!defineExpose 是什么?
  defineExpose 是 Vue 3 中的 Composition API 的一个函数，用于 暴露子组件中的方法、属性或其他数据 给父组件。这对于需要直接调用子组件功能的场景非常有用。通过 defineExpose，父组件可以通过模板引用访问子组件内部定义的方法或数据。
?注意：
  使用 <script setup> 的组件是默认关闭的——即通过模板引用或者 $parent 链获取到的组件的公开实例，不会暴露任何在 <script setup> 中声明的绑定
?作用：
  可以通过 defineExpose 编译器宏来显式指定在 <script setup> 组件中要暴露出去的属性
-->
<template>
  <div id="wrap">
    <h1>defineExpose</h1>
    <!-- SonDemo22 -->
     <!-- 方法1： -->
    <SonDemo22 ref=childRef />
    <SonDemo22 ref=resetData />
    <!-- 方法2： -->
     <!-- <SonDemo22 ref=funs /> -->
    <button @click="callChildMethod">调用子组件方法</button>
    <button @click="resetChildData">重置子组件数据</button>
  </div>
</template>

<script lang="ts">
export default {
  name: 'dayStuDemo49',
}
</script>

<script lang="ts" setup>

import {useTemplateRef } from 'vue'
import SonDemo22 from './components/SonDemo22.vue'

/*
useTemplateRef 的用法 假设我们需要在父组件中动态引用子组件实例并调用其暴露的方法。
1、父组件通过 useTemplateRef 获取子组件的实例引用
2、子组件通过 defineExpose 暴露了 childMethod、resetData
3、父组件可以调用暴露的 childMethod 方法
*/
//方法1：
const childRef = useTemplateRef('childRef')
const callChildMethod = () => {
  childRef.value?.childMethod('参数')
}
const child = useTemplateRef('resetData')
const resetChildData = () => {
  child.value?.resetData()
}

//方法2：
// const funs = useTemplateRef('funs')
// const callChildMethod = () => {
//   funs.value?.childMethod('参数')
// }
// const resetChildData = () => {
//   funs.value?.resetData()
// }
</script>

<style lang="scss"></style>
