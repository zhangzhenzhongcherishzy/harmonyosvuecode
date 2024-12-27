<!--
在 Vue 3 中，组合式函数（Composition Functions） 是通过组合式 API 提供的一种组织逻辑的方式，它允许你在一个函数中封装逻辑，然后在多个组件中复用这些逻辑。

!核心思想：
  组合式函数的核心思想是将逻辑与其相关的状态和生命周期钩子组合在一起，形成一个独立的功能模块。这种方法比选项式 API（Options API）更灵活、更具可读性，尤其在处理复杂逻辑或跨组件复用时。

!组合式函数的特点:
  1、独立封装：将逻辑封装成函数，具有独立性和复用性。
  2、灵活性高：通过 ref、reactive 等响应式 API，可以轻松实现复杂的状态和逻辑。
  3、共享逻辑：组合式函数可以在多个组件中复用，而无需通过混入或 HOC（高阶组件）。

-->
<template>
  <div id="wrap">
    <h1>组合式函数</h1>
    <div>Mouse position is at: {{ x }}, {{ y }}</div>
    <button @click="toggleDark">切换暗黑模式</button>
  </div>
</template>

<script lang="ts">
export default {
  name: 'dayStuDemo46',
}
</script>

<script lang="ts" setup>
import { useDark, useMouse, useToggle } from '@vueuse/core'
//cnpm/npm/pnpm install @vueuse/core
//cnpm/npm/pnpm install @types/vueuse
//yarn add @vueuse/core
//yarn add @types/vueuse


const { x, y } = useMouse()
const isDark = useDark()
const toggleDark = () => {
  isDark.value = !isDark.value
}
const toggleDark1 = useToggle(isDark)
console.log(toggleDark1);

</script>

<style lang="scss"></style>
