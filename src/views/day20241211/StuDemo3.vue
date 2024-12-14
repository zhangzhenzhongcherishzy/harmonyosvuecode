<template>
  <div id="wrap">
    <h1>改造组合式API</h1>
    <!-- 插值表达式 -->
    <p>{{ str }}</p>
    <p>{{ num }}</p>
    <img :src="imgSrc" alt="" />
    <img :src="src" alt="" /><br />
    <!-- 按钮方法绑定-->
    <button @click="add">增加</button>
    <p>{{ data }}</p>
    <!-- 数据双向绑定 v-model="tests" -->
    <p>{{ test }}</p>
    <input type="text" v-model="test" /><br />
    <!-- 改变按钮 -->
    <button @click="etid">改变</button>
  </div>
</template>
<script lang="ts">
export default {
  name: 'dayStuDemo3',
}
</script>
<script lang="ts" setup>
import { ref } from 'vue'
import imgSrc from '@/assets/images/5.jpg'
// const str: string = '你好世界'
const str = ref<string>('你好世界')
const num: number = 123
const data = ref<number>(123)
const test: string = '小明'
const src = ref<string>(imgSrc)
const add = () => {
  data.value++
}
const etid = (): void => {
  str.value = '我是普通变量，不支持UI刷新'
}
</script>
<style lang="scss"></style>
