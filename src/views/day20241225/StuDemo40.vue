<!--
!Emit：子组件通过 $emit 触发自定义事件，父组件监听事件接收数据。
  1、使用 defineEmits 来声明事件
  2、使用 emit 触发事件，并将事件名称和数据作为参数传递。

!用法：
    1、子组件定义 emit 事件，父组件通过 @事件名监听。
    2、可以传递多个参数

!基本语法:
  <button @click="triggerEvent">Click me</button>
  const emit = defineEmits();
  const triggerEvent = () => {
    emit('customEvent', 'Hello from child'); // 触发自定义事件，并传递参数
  }

!defineEmits 定义事件
  在 Vue 3 中，我们通过 defineEmits 来声明组件可能触发的事件。它是一个组合 API，用来声明和约束 emit 的事件类型
  todo简单声明
    const emit = defineEmits(['customEvent'])  ===> 这表明子组件会触发一个名为 customEvent 的事件。
  todo带类型声明
    const emit = defineEmits<{
      (e: 'submit', payload: { email: string; password: string }): void;
    }>();
  todo验证事件参数
    const emit = defineEmits({
      submit(payload: { email: string; password: string }) {
        if (payload.email === payload.password) {
          return true;
        }
        return false;
      }
    });



-->
<template>
  <div id="wrap">
    <h1>组件事件emit</h1>
    <!-- 子组件SonDemo8 -->
    <SonDemo8 :user msg="躺尸七天" @son-emit="emitHandler"></SonDemo8>
    <hr />

    <!-- 子组件SonDemo10 -->
    <!-- <SonDemo10
      class="groupBorder"
      :user
      msg="躺尸七天"
      @son-emit="emitHandler"
      @son-emit2="emitHandler2"
      @event1="handleEvent1"
      @event2="handleEvent2"
    ></SonDemo10> -->
    <SonDemo10 @customEvent="handleCustomEvent" @submit="handleSubmit"></SonDemo10>

    <!-- 子组件SonDemo11 -->
    <SonDemo11 class="groupBorder" @submit="submitHandler"></SonDemo11>
    <hr />

    <!-- 子组件SonDemo12 -->
    <SonDemo12 class="groupBorder" :user @editUser="editUserHandler"></SonDemo12>
    <hr />
  </div>
</template>

<script lang="ts">
export default {
  name: 'dayStuDemo40',
}
</script>

<script lang="ts" setup>
import { ref } from 'vue'
import { type Iuser } from './components/SonDemo8.vue'
import SonDemo8 from './components/SonDemo8.vue'
import SonDemo10 from './components/SonDemo10.vue'
import SonDemo11 from './components/SonDemo11.vue'
import SonDemo12 from './components/SonDemo12.vue'

// 子组件SonDemo8 传递多个参数
const user = ref<Iuser>({
  age: 16,
  name: '小明',
  sex: '男',
})
const emitHandler = (p1: number, p2: string, p3: { name: string }) => {
  console.log('此函数是由子组件使用emit触发调用', p1, p2, p3)
}

// // 子组件SonDemo10
// const emitHandler2 = () => {
//   console.log(' @son-emit2="emitHandler2"')
// }
// //触发多个事件
// const handleEvent1 = (data: string) => {
//   console.log(data) // 'data for event1'
// }
// const handleEvent2 = (data: string) => {
//   console.log(data) // 'data for event2'
// }
//带类型声明
const handleCustomEvent = (message: string) => {
  console.log(message) // 输出 'Hello from child'
}
const handleSubmit = (payload: { email: string; password: string }) => {
  console.log(payload.email, payload.password)
  const result = payload.email === payload.password
  console.log(result) // 输出验证结果 (true 或 false)
}

// 子组件SonDemo11
const submitHandler = () => {
  console.log(' submitHandler')
}

// 子组件SonDemo12
const editUserHandler = (user: Iuser) => {
  console.log(user, 'editUserHandler')
}
</script>

<style lang="scss"></style>
