<template>
  <div>
    <h1>通过泛型参数来定义 props 的类型</h1>
    <p>{{ props.title }}</p>
    <p>{{ props.user }}</p>
    <p>{{ props.msg }}</p>
  </div>
</template>

<script setup lang="ts">
export interface Iuser {
  id?: number
  name: string
  sex: string
  age: number
}

const props = defineProps<{
  title: string
  user: Iuser
  msg?: string
}>()
</script>

<style></style>
