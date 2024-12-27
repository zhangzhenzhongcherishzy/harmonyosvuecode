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
  <div id="wrap" :class="{ dark: isDark }">
    <h1>组合式函数</h1>

    <!-- 第一个的组合式函数写法，记录鼠标移动坐标的方法 -->
    <!-- <p>鼠标当前X轴坐标:{{ x }}&nbsp;&nbsp;&nbsp;鼠标当前Y轴坐标:{{ y }}</p> -->

    <!-- 第二种，方法独立封装 -->
    <!-- <p>鼠标当前X轴坐标:{{ x }}&nbsp;&nbsp;&nbsp;鼠标当前Y轴坐标:{{ y }}</p> -->
    <!-- <p>Foo: {{ state.foo }}</p> -->
    <!-- <p>Bar: {{ state.bar }}</p> -->
    <!-- <input v-model="inputVal" placeholder="Enter number or string" /> -->

    <!-- 第三种，下载组合函数 -->
    <p>鼠标当前X轴坐标:{{ x }}&nbsp;&nbsp;&nbsp;鼠标当前Y轴坐标:{{ y }}</p>
    <button @click="toggleDarkModeHandler">Toggle Dark Mode</button>
  </div>
</template>

<script lang="ts">
export default {
  name: 'dayStuDemo48',
};
</script>

<script lang="ts" setup>
// import { ref } from 'vue';
// 第一个的组合式函数写法，记录鼠标移动坐标的方法
// import { useMouse } from './hooks/mouse';
// const {x,y} = useMouse()

//第二种，方法独立封装
// import { useMouse } from './hooks/mouse';
//坐标的解构
// const fVal = ref(0)
// const {x,y} = useMouse(() => fVal.value)
// const {x,y} = useMouse(fVal)
//响应式数据：reactive解构
// 输入值，用于动态传递到 useMouse
// const inputVal = ref<string>('Hello');
// 使用 useMouse 并传入响应式的 inputVal
// const { x, y, ...state } = useMouse(() => inputVal.value);

//第三种，下载组合函数
import { useDark, useMouse, useToggle } from '@vueuse/core';
//cnpm/npm/pnpm install @vueuse/core
//cnpm/npm/pnpm -D @types/vueuse
//yarn add @vueuse/core
//yarn add -D @types/vueuse
const { x, y } = useMouse();
// 使用 useDark 管理暗模式
const isDark = useDark(); // 是否处于暗模式
const toggleDarkMode = useToggle(isDark); // 切换暗模式  useToggle 是 @vueuse/core 库中的一个组合式函数，它用于切换布尔值的状态
// 包装事件处理函数，避免类型问题
const toggleDarkModeHandler = () => toggleDarkMode();
</script>

<style lang="scss">
/* 示例暗模式样式 */
body {
  transition:
    background-color 0.3s,
    color 0.3s;
}

.dark {
  background-color: black;
  color: white;
}
input {
  border: none;
  width: 280px;
  height: 30px;
  border-radius: 15px;
  line-height: 30px;
  font-size: 15px;
  color: white;
  padding-left: 2rem;
  background-color: #409eff;
  margin: 5px;
}
</style>
