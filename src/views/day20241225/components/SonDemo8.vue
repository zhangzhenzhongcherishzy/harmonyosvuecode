<template>
  <div id="wrap">
    <h1>通过泛型参数来定义 props 的类型:3.4&3.5</h1>
    <!-- 显示标题 -->
    <p>{{ title }}</p>
    <!-- 显示父组件传递的 user 对象 -->
    <p v-for="item in user" :key="item">{{ item }}</p>
    <!-- 显示可选的 msg -->
    <p>{{ msg }}</p>
    <button type="button" @click="$emit('sonEmit', 1, 'string', { name: '小强' })">
      emit触发父组件绑定子组件上的函数
    </button>
  </div>
</template>

<script setup lang="ts">
export interface Iuser {
  name: string
  sex: string
  age: number
}

// const props = defineProps<{
//   title: string
//   user: Iuser
//   msg?: string
// }>()

// 响应式Props解构 3.5 ===> 使用解构方式接收 Props
const {
  title = '江山如此多娇,引无数英雄竞折腰',
  msg,
  user,
} = defineProps<{
  title?: string
  user: Iuser
  msg?: string
}>()
</script>

<style></style>
