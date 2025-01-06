<!--
!Pinia:
  Pinia 状态管理是一种管理全局状态的工具，用于解决多个组件之间共享状态的问题。Pinia 是 Vue 3 官方推荐的状态管理库，其核心目标是简洁、现代、直观，并且完全支持组合式 API 和 TypeScript
!Pinia 状态管理是什么
核心概念：
  1、Store（存储）：一个定义了状态（state）、计算属性（getters）和动作（actions）的模块。
  2、State（状态）: 存储全局响应式数据。。
  3、Getters（派生状态）: 类似于计算属性，用于基于 State 计算值。
  4、Actions（操作）: 定义修改状态的方法或异步操作。
功能特点：
  1、模块化: 可以定义多个独立的 Store，按需引入。
  2、响应式: Store 的状态是响应式的，支持 Vue 的 ref 和 reactive。
  3、与 TypeScript 集成: 提供强大的类型推导和类型检查。
  4、支持插件: 可扩展功能，如状态持久化、缓存等。
适用场景
  1、多组件共享的全局数据。
  2、需要派生状态的复杂计算。
  3、需要在状态变更时触发逻辑

!defineStore 的含义和作用
  在 Pinia 中，defineStore 是一个函数，用于定义和创建一个 Store。Store 是 Pinia 的核心概念，用于管理全局的状态数据。
!defineStore 的作用
  1、定义一个全局状态管理模块。
  2、指定该 Store 的 名称 和 结构（包括状态、派生状态和操作）。
  3、提供一个可复用的实例，供 Vue 组件使用。
语法：
  const useStore = defineStore(
    id,  // Store 的唯一标识（字符串）
    options // 配置对象，定义状态、派生状态和方法
  );
参数说明：
  1、id（必需）
    1-1、类型：string。
    1-2、Store 的唯一标识，用于区分不同的 Store。
    1-3、例如：'counters' 是 Store 的名称，表示这个 Store 管理计数器相关的状态。
  2、options（必需）
    2-1、类型：对象。
    2-2、用来定义 Store 的 状态（state）、派生状态（getters） 和 方法（actions）。
    2-3、典型的结构如下：
      {
        state: () => ({ /* 状态数据 */ }),
        getters: { /* 派生状态 */ },
        actions: { /* 修改状态的方法 */ },
      }
!Store（存储）的方法
  1、重置整个 state
    使用 Pinia 的 this.$reset() 方法，可以将 state 重置为初始状态（适用于选项式 API）。
  2、修改：$patch()
  3、$patch() 和 $reset() 的区别
    特性	            $patch()	                                      $reset()
    功能              修改 state 的部分字段，可以是一个对象或函数。	     将整个 state 重置为初始状态。
    应用场景	        更新部分状态，例如用户修改个人信息或调整设置。	    置整个 Store，例如用户注销或恢复初    始配置。
    灵活性	          更灵活，可以细粒度修改状态。	                    只适用于恢复到初始状态。
  4、总结：
    $patch()：用于批量、部分或函数式地修改 state，灵活性更高，适合日常状态更新。
    $reset()：用于将整个 state 恢复到初始状态，通常适用于全局清理（如用户注销）。
-->
<template>
  <div id="wrap">
    <h1>状态管理Pinia</h1>
    <!-- 选项式写法 -->
    <p>Count: {{ counterStore1.count }}</p>
    <p>name: {{ counterStore1.name }}</p>
    <p>Double Count: {{ counterStore1.doubleCount }}</p>
    <p>Double Count+1: {{ counterStore1.doublePlusone }}</p>
    <button @click="counterStore1.increment">Increment</button>
    <button @click="counterStore1.$reset()">reset</button>
    <button @click="counterStore1.$patch({ count: 1, name: 'JSon' })">修改state的count</button>

    <!-- 组合式写法 -->
    <p>Count: {{ counterStore2.count }}</p>
    <p>name: {{ counterStore2.name }}</p>
    <p>Double Count: {{ counterStore2.doubleCount }}</p>
    <p>Double Count+1: {{ counterStore2.doublePlusone }}</p>
    <button @click="counterStore2.increment">Increment</button>
    <button @click="counterStore2.reset">reset</button>
    <button @click="counterStore2.$patch({ count: 1, name: 'JSon' })">修改state的count</button>
  </div>
</template>

<script lang="ts">
export default {
  name: 'dayStuDemo56',
}
</script>

<script lang="ts" setup>
import { useStoreone, useStoretwo } from '@/stores/counter'
const counterStore1 = useStoreone()
const counterStore2 = useStoretwo()
</script>

<style lang="scss"></style>
