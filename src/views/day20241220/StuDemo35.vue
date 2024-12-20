<!--
watchEffect 是一种更简单的响应式侦听器，用于自动追踪并运行副作用逻辑。它会自动侦听在回调中使用的所有响应式数据，无需显式指定侦听目标

!语法：watchEffect(callback, options?)
  callback:
    1、必需，一个函数，包含副作用逻辑。
    2、函数会自动依赖在其内部使用的响应式数据，当这些数据发生变化时，callback 会重新执行。
  options：
    1、可选，用于配置侦听行为的对象，包含以下属性：
    2、flush: 控制回调的执行时机（'pre'、'post'、'sync'）

!watchEffect 的特点：
  1、自动依赖追踪：内部使用的所有响应式数据都会被侦听。
  2、无需指定依赖：比 watch 更简洁。
  3、立即执行：回调会在绑定后立即执行一次。

!与watch的区别
  1、自动追踪依赖：
    watchEffect 会立即执行传入的函数，并自动追踪该函数内部所依赖的所有响应式数据。如果这些依赖数据发生变化，watchEffect 会重新执行该函数。
    watch 则需要显式地指定要侦听的响应式数据（一个或多个）。它不会自动追踪依赖。
  2、执行时机：
    watchEffect 在初始化时会立即执行一次，以确保追踪所有依赖。
    watch 只会在侦听的数据发生变化时执行回调函数。
  3、获取旧值和新值：
    watchEffect 只能在回调函数重新执行时获取到新值，无法直接获取旧值。不过，可以在回调函数内部手动保存旧值，以便在后续的执行中使用。
    watch 可以获取到侦听的数据变化前后的旧值和新值。
  4、停止侦听：
    两者都返回一个停止侦听的函数。可以调用这个函数来停止侦听响应式数据的变化。
-->
<template>
  <div id="wrap">
    <h1></h1>
  </div>
</template>

<script lang="ts">
export default {
  name: 'StuDemo35',
}
</script>

<script lang="ts" setup>
import { ref } from 'vue'
</script>

<style lang="scss"></style>
