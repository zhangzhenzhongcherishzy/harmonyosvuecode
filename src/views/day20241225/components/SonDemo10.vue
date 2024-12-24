<template>
  <div>
    <!-- <h1>组件事件emit</h1>
    <p>{{ tle }}</p>
    <p>{{ user }}</p>
    <p>{{ msg }}</p>

    <hr />
    <button
      type="button"
      @click="
        () => {
          emit('sonEmit', 1, 'string', { name: '小强' })
        }
      "
    >
      emit触发父组件绑定子组件上的函数
    </button>

    <button type="button" @click="editTitle">
      emit触发父组件绑定子组件上的函数2(修改title的值)
    </button> -->

    <!-- 触发多个事件 -->
    <!-- <button @click="triggerEvent1">Trigger Event 1</button> -->
    <!-- <button @click="triggerEvent2">Trigger Event 2</button> -->

    <!-- 带类型声明 -->
    <button @click="triggerEvent">Trigger Custom Event</button>
    <button @click="triggerSubmit">Trigger Submit</button>
  </div>
</template>

<script setup lang="ts">
// import { ref } from 'vue'
// export interface Iuser {
//   name: string
//   sex: string
//   age: number
// }
// const emit = defineEmits(['sonEmit', 'sonEmit2', 'event1', 'event2'])
// // 响应式 Props 解构 3.5
// const {
//   title = '江山如此多娇,引无数英雄竞折腰',
//   msg,
//   user,
// } = defineProps<{
//   title?: string
//   user: Iuser
//   msg?: string
// }>()
// const tle = ref(title)
// const editTitle = () => {
//   tle.value = '数风流人物,还看今朝'
//   emit('sonEmit2')
// }

// // 触发多个事件
// const triggerEvent1 = () => {
//   emit('event1', 'data for event1')
// }
// const triggerEvent2 = () => {
//   emit('event2', 'data for event2')
// }

//带类型声明
const emit = defineEmits<{
  (e: 'customEvent', message: string): void
  (e: 'submit', payload: { email: string; password: string }): void;
}>()
// 触发 customEvent 事件
const triggerEvent = () => {
  emit('customEvent', 'Hello from child')
}
// 触发 submit 事件

const triggerSubmit = () => {
  const result = { email: 'user@example.com', password: 'password123' };
  emit('submit', result);
}
</script>

<style></style>
