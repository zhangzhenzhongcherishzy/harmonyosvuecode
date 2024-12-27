<template>
  <div>
    <p>子组件绑定 标题： {{ title }}</p>
    <p>子组件绑定 内容： {{ msg }}</p>
    <input type="text" v-model="title" />
    <input type="text" v-model="msg" />
    <p>子book:{{ bookInfo }}</p>
    <input type="text" v-model="bookInfo.title" />
    <input type="text" v-model="bookInfo.author" />
    <input type="text" v-model="bookInfo.year" />
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
export interface Book {
  title: string
  author: string
  year: number
}
const title = defineModel('title', { type: String, required: true })
const msg = defineModel('msg', { type: String, required: true })
const bookInfo = defineModel('bookInfo', {
  type: Object as PropType<Book>,
  default() {
    return {
      title: '北派盗墓笔记',
      author: '云峰',
      year: 2000
    }
  }
})
</script>

<style></style>
