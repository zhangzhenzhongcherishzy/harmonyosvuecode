<!--
文本插值

!{{}}（插值表达式）:
  作用：
    文本插值用于将 JavaScript 表达式的值插入到 HTML 中。
  语法：
    1、使用 {{ }} 来插入变量或表达式。
    2、支持简单的字符串、表达式、条件判断、数组操作等。
    ps:支持动态拼接字符串和条件渲染

!数组与条件渲染：
  作用：
    通过数组操作和条件渲染生成动态内容

!v-text 指令:
  作用：
    v-text 指令和 {{ }} 的作用相同，用于显示文本内容。但它是一个指令，适合需要动态绑定文本内容的场景。
  语法：
    <p v-text="rawHtml"></p>
    ps:v-text 是指令，可以在需要动态绑定时直接使用，适合替代 innerText

!v-html 指令
  作用：
    v-html 指令用于将 HTML 字符串渲染为真正的 HTML 元素，而不是纯文本。需要注意，v-html 会直接插入内容，可能带来 XSS 安全问题。
  语法：
    <div v-html="rawHtml"></div>
    ps:rawHtml 的内容将被解析为 HTML 元素（例如 <span> 标签）
!事件绑定:
  作用：
    通过 @ 或 v-on 绑定事件处理器
  语法：
    <button @click="handlerFunction">Click Me</button>

!响应式数据绑定:
  作用：
    通过 Vue 的响应式数据系统实现自动更新的 UI。例如，使用 ref 定义响应式变量，使用 storeToRefs 从 Pinia 中获取状态

!组合使用：
  Vue 的模板语法可以结合插值、指令、事件和动态属性实现复杂的功能，例如表单、列表渲染等

!区别：
  特性	      {{}} (插值表达式)	              v-text	               v-html
内容类型	   文本（自动转义 HTML）	      文本（自动转义 HTML）	    HTML（不会转义 HTML）
应用场景	      显示简单文本	              动态绑定纯文本	          动态渲染 HTML
HTML 转义	      自动转义	                    自动转义	                不转义
安全性	          高	                          高	              低，需确保数据可信
-->

<template>
  <div id="wrap">
    <h1>文本插值&原始 HTML</h1>
    <p>Using text interpolation: {{ rawHtml }}</p>
    <p v-text="rawHtml"></p>
    <hr />
    <!-- ?{{  }}表达式 -->
    <p>Using text interpolation: {{ rawHtml + '后缀字符串' }}</p>
    <p>Using text interpolation: {{ ` ${rawHtml} 后缀字符串` }}</p>
    <p>Using text interpolation: {{ istrue ? rawHtml : ` ${rawHtml} 后缀字符串false` }}</p>
    <!-- 数组与条件渲染 -->
    <p>Using text interpolation: {{ istrue ? arr.join(',') : ` ${rawHtml} 后缀字符串false` }}</p>
    <p>{{ arr.join(',') }}</p>
    <hr />
    <!-- ?v-text指令 -->
    <p v-text="rawHtml + '后缀字符串'"></p>
    <p v-text="` ${rawHtml} 后缀字符串`"></p>
    <p v-text="istrue ? rawHtml : ` ${rawHtml} 后缀字符串false`"></p>
    <p v-text="arr.join(',')"></p>
    <hr />
    <!-- ?v-html指令 -->
    <div>
      Using v-html directive:
      <div v-html="rawHtml"></div>
    </div>
    <hr />
    <!-- ?响应式数据绑定 -->
    <div>
      <div>Current Count: {{ count }}</div>
      <div>Current doubleCount: {{ doubleCount }}</div>
      <button type="button" @click="counterStore.increment">counterStore.count++</button>
      <div>ref: {{ cr }}</div>
      <button type="button" @click="cr++">ref:cr++</button>
    </div>
    <!-- ?组合使用 使用 v-for 遍历数组并渲染列表-->
    <ul>
      <li v-for="(item, index) in arr" :key="index">{{ item }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  name: 'dayStuDemo8',
}
</script>

<script lang="ts" setup>
import { ref } from 'vue'
//响应式数据绑定
import { useCounterStore } from '@/stores/counter'
import { storeToRefs } from 'pinia' //Pinia（Vue 的状态管理库）
//这是 Pinia 提供的一个方法，它用来获取一个 store，即存储数据和逻辑的地方。你可以把 counterStore 想象成一个包含数字（如计数器）和处理这些数字的函数（比如增加数字）的一组数据
const counterStore = useCounterStore()
//这是 Pinia 提供的一个工具函数，用于将 store 中的响应式数据转换成 ref，这样它们可以在模板中进行绑定。count 和 doubleCount 就是从 store 中提取的响应式数据。
const { count, doubleCount } = storeToRefs(useCounterStore())
const cr = ref(0)

const rawHtml = `<span style="color:blue"> 我是html标签span</span>`
const istrue = false
const arr = ['小明', '小红', '小绿']
</script>

<style lang="scss"></style>
