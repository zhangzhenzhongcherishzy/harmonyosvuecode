
<!--
!基本概念
  1、v-model 语法：用于父子组件之间实现双向绑定的语法糖。
  2、核心原理：v-model 本质是通过 props 传递数据，使用 emit 回传更新事件 (update:propName) 来实现数据同步。

!v-model 基础用法：
  1、子组件通过 defineModel 自动处理双向绑定。
  2、默认字段为 modelValue，可通过 v-model:customProp 定义自定义字段。

!传统方式：
  1、使用 props 和 emit 实现双向绑定。
  2、必须显式监听和传递 @update 事件。

!处理复杂数据：
  1、使用 reactive 和 watch 管理对象。
  2、避免直接修改 props，通过 emit 通知父组件更新。

!适用场景选择：
  1、defineModel：更简洁，适合单一数据绑定。
  2、props + emit：更灵活，适合需要复杂事件逻辑或处理非响应式数据的场景。

!多字段绑定：
  1、使用 v-model:propName 绑定多个字段，实现更清晰的父子组件通信。
-->
<template>
  <div id="wrap">
    <h1>组件 v-model</h1>
    <!-- SonDemo18 -->
    <div class="group">
      <button type="button" @click="mVal++">在父组件修改 mVal 的值</button>
      <SonDemo18 :mVal="mVal" @update:mVal="(val) => {mVal = val}"></SonDemo18>
    </div>
    <hr>


    <!-- SonDemo19 -->
    <div class="group">
      <p @click="mVal++">父组件绑定的值：{{ mVal }}</p>
      <p @click="() => {userInfo.age++}">
        父-用户信息：{{ userInfo }}
      </p>
      <SonDemo19
      :mVal="mVal"
      :mVal2="mVal2"
      :userInfo="userInfo"
      @update:mVal=" (val) => {mVal = val}"
      @update:mVal2="(val: any) => {mVal2 = val}"
      @update:userInfo="(val: any) => {userInfo = val}"
      ></SonDemo19>
    </div>
    <hr>

    <!-- SonDemo20 -->
    <div class="group">
      <p @click="mVal++">父组件绑定的值：{{ mVal }}</p>
      <SonDemo20 v-model="mVal"></SonDemo20>
    </div>
    <hr />

    <!-- SonDemo21 -->
    <div class="group">
      <p @click="title = '修改后的值'">父组件绑定 标题： {{ title }}</p>
      <p>父组件绑定 内容： {{ msg }}</p>
      <p>父book:{{ book }}</p>
      <SonDemo21 v-model:msg="msg" v-model:title="title" v-model:book-info="book"></SonDemo21>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'dayStuDemo45',
}
</script>

<script lang="ts" setup>
import { ref } from 'vue'
import SonDemo18 from './components/SonDemo18.vue'
import SonDemo19 from './components/SonDemo19.vue'
import SonDemo20 from './components/SonDemo20.vue'
import SonDemo21 from './components/SonDemo21.vue'
import { type Book } from './components/SonDemo21.vue'

// SonDemo18
const mVal = ref(100)


// SonDemo19
const mVal2 = ref(3000)
const userInfo = ref({ name: '小明', sex: '男', age: 22 })

// SonDemo21
const title = ref('父组件标题')
const msg = ref('父组件内容')
const book = ref<Book>({ title: '盗墓笔记', author: '南派三叔', year: 3000 })
</script>

<style lang="scss">
.group {
  border: 5px solid rgb(60, 130, 200);
  padding: 10px;
  margin: 10px;
  box-sizing: border-box;
}
</style>
