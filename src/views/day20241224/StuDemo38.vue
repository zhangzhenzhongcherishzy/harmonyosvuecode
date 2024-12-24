<!--
Vue 3 的 TypeScript 环境中，组件间的传值主要通过 props 和 emit 实现

props 基本用法：props 是父组件向子组件传递数据的方式。子组件通过 defineProps 接收父组件传递的数据
  1、普通传值： 在父组件中通过 v-bind 或直接绑定属性传递。
  2、动态数据： 可传递动态计算的变量或对象。
  3、函数： 通过父组件传递函数给子组件，子组件调用实现逻辑。

Emit：子组件通过 $emit 触发自定义事件，父组件监听事件接收数据。
  用法：
    1、子组件定义 emit 事件，父组件通过 @事件名 监听。
    2、可以传递多个参数

-->
<template>
  <div id="wrap">
    <h1>组件传值 props</h1>
    <!-- 场景一 -->
    <!-- <SonDemo1 :title :count></SonDemo1> -->
    <!-- 场景二 -->
    <SonDemo1 :title="`子组件的标题`" :descript="des"></SonDemo1>
    <hr />

    <!-- 子组件SonDemo2 -->
    <p>{{ fTitle }}</p>
    <SonDemo2 :title="`SonDemo2子组件的标题`" :des="sd2Des" :propH="sd2PropsFunc"></SonDemo2>
    <hr />

    <!-- 子组件SonDemo3 -->
    <SonDemo3
      :title="`SonDemo3子组件的标题`"
      :des="sd3Des"
      :user="sd3User"
      :propH="sd3PropsFunc"
    ></SonDemo3>
    <hr />

    <!-- 子组件SonDemo4 -->
    <SonDemo4 msg="举杯邀明月，对影成三人"></SonDemo4>
    <hr />

    <!-- 子组件SonDemo5 -->
    <SonDemo5 msg="举杯邀明月，对影成五人"></SonDemo5>
    <hr />

    <!-- 子组件SonDemo6 -->
    <SonDemo6 msg="举杯邀明月，对影成七人"></SonDemo6>
    <hr />

    <!-- 子组件SonDemo7 -->
    <SonDemo7 title="床前明月光,国庆回家乡" :user msg="躺尸七天"></SonDemo7>
    <hr />
  </div>
</template>

<script lang="ts">
export default {
  name: 'dayStuDemo38',
}
</script>

<script lang="ts" setup>
import { ref } from 'vue'
import { type Iuser } from './components/SonDemo7.vue';
import SonDemo1 from './components/SonDemo1.vue'
import SonDemo2 from './components/SonDemo2.vue'
import SonDemo3 from './components/SonDemo3.vue'
import SonDemo4 from './components/SonDemo4.vue'
import SonDemo5 from './components/SonDemo5'
import SonDemo6 from './components/SonDemo6.vue'
//场景一
// const count = ref(10)
// const title = ref('标题内容')

//场景二
const des = 999999999

//子组件SonDemo2
const fTitle = ref('')
const sd2Des = ref('传入的des')
// const sd3User = ref({
//   name: '小明',
//   sex: 0
// })
const sd2PropsFunc = (sonTitle: string, fc: () => void) => {
  fTitle.value = sonTitle
  fc()
  console.log('这是一个父组件的函数，他被传入了子组件', sonTitle)
}

// 子组件SonDemo3
const sd3Des = ref('传入的des')
const sd3User = ref({
  name: '小绿',
  sex: 0,
})
const sd3PropsFunc = (sonTitle: string, fc:() => void) => {
  fTitle.value = sonTitle
  fc()
  console.log('这是一个父组件的函数，他被传入了子组件', sonTitle)
}

// 子组件SonDemo7
const user = ref<Iuser>({
  age: 66,
  name: '小绿',
  sex: '男'
})
</script>

<style lang="scss"></style>
