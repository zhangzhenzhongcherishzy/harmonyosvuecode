<template>
  <div>
    <h1>使用纯类型标注来声明触发的事件</h1>
    <p>{{ tle }}</p>
    <p>{{ user }}</p>
    <p>{{ msg }}</p>

    <hr />

    <button type="button" @click="editTitle">
      emit触发父组件绑定子组件上的函数2(修改title的值)
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

export interface Iuser {
  name: string
  sex: string
  age: number
}

const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
  (e: 'edit', val1: string, val2: number): void
  (e: 'editUser', user: Iuser): number
}>()

// 响应式 Props 解构 3.5
const {
  title = '江山如此多娇,引无数英雄竞折腰',
  msg,
  user
} = defineProps<{
  title?: string
  user: Iuser
  msg?: string
}>()

const tle = ref(title)

const editTitle = () => {
  tle.value = '数风流人物,还看今朝'

  emit('editUser', { age: 2, name: '毛泽东', sex: '男神' })
}
</script>

<style></style>
