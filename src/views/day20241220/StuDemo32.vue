<!--
侦听器（watch） 是一个用于监听响应式数据或计算属性变化的工具。通过侦听器，在某个值发生变化时执行特定的逻辑，例如发起请求、更新状态等

!语法：
  watch(source, callback, options?)
    source:必需，需要监听的目标（响应式数据/计算属性/函数/数组）
    callback：必需，当 source 发生变化时触发的回调函数
      接收两个参数：newValue：新值。 /  oldValue：旧值。
    options：可选，用于配置侦听器行为的对象，包含以下选项
      1、immediate: boolean，是否立即执行回调函数（默认为 false）
      2、deep: boolean，是否深度监听（默认为 false）
      3、flush: string，指定回调的执行时机（'pre'、'post' 或 'sync'）
          3-1、pre（默认）：在 DOM 更新之前触发
          3-2、post：在 DOM 更新之后触发。
          3-3、sync：同步触发。

!侦听器的基本属性:
  1、监听目标：可以是一个响应式变量、计算属性，或者多个响应式数据组成的对象
  2、回调函数：当监听目标的值发生变化时触发，接收两个参数
      newValue: 最新的值
      oldValue: 旧值
  3、选项：用来控制侦听行为的配置项（immediate 和 deep 常用）。

!常见选项：
  1、immediate：如果设置为 true，侦听器会在绑定后立即执行一次回调函数。
  2、deep：用于深度侦听，适合监听对象内部的变化（如数组的项，或对象的子属性）。

!侦听器的方法：
  1、单个值的侦听：侦听一个响应式数据或计算属性：
  2、多值侦听：侦听多个值，可以用数组的方式：
  3、深度侦听对象：侦听对象的子属性变化需要用 deep: true
  4、立即执行：绑定后立即触发一次侦听器，用 immediate: true

!侦听器的应用场景：
  1、接口请求：根据用户输入发起请求（如你的例子）。
  2、同步状态：监听数据变化并更新其他依赖变量
  3、本地存储：实时保存数据到浏览器的 localStorage。
  4、动画或效果：当值变化时触发一些视觉效果



-->
<template>
  <div id="wrap">
    <h1>侦听器（watch）</h1>
  </div>
</template>

<script lang="ts">
export default {
  name: 'dayStuDemo32',
}
</script>

<script lang="ts" setup>
// 单个值的侦听：侦听一个响应式数据或计算属性
import { ref, watch, reactive } from 'vue'
const count = ref(0)
watch(count, (newValue, oldValue) => {
  console.log(`count响应式变量改变从${oldValue}到${newValue}`)
})
count.value++

// 多值侦听：侦听多个值，可以用数组的方式
const x = ref(0)
const y = ref(0)
watch([x, y], ([newX, newY], [oldX, oldY]) => {
  console.log(`x 响应式变量改变从 ${oldX} 到 ${newX}, y 响应式变量改变从 ${oldY} 到${newY}`)
})
x.value = 1
y.value = 2

// 监听函数返回值
const name = ref('Alice')
watch(
  () => name.value.length,
  (newLength, oldLength) => {
    console.log(`Name length changed from ${oldLength} to ${newLength}`)
  },
)

// 深度侦听对象：侦听对象的子属性变化需要用 deep: true
const user1 = reactive({
  name: 'Alice',
  details: {
    age: 25,
    hobbies: ['reading', 'coding'],
  },
})
watch(
  user1,
  (newVal, oldVal) => {
    console.log('User object changed:', newVal)
  },
  { deep: true },
)
// 修改嵌套属性会触发侦听器
user1.details.age = 26

// 立即执行：绑定后立即触发一次侦听器，用 immediate: true
const message = ref('Hello!')
watch(
  message,
  (newValue, oldValue) => {
    console.log(`message is: ${newValue}`)
  },
  { immediate: true },
)
// 初始绑定时会立即输出: message is: Hello!

// 控制执行时机（flush）
const value = ref(0)
watch(
  value,
  (newVal) => {
    console.log('DOM may not be updated yet:', newVal)
  },
  { flush: 'pre' }, // 默认值
)
watch(
  value,
  (newVal) => {
    console.log('DOM is updated:', newVal)
  },
  { flush: 'post' },
)
watch(
  value,
  (newVal) => {
    console.log('Triggered synchronously:', newVal)
  },
  { flush: 'sync' },
)
</script>
