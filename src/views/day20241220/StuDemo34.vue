
<template>
  <div id="wrap">
    <h1></h1>
    <!-- watch 的第一个参数可以是不同形式的“数据源”：它可以是一个 ref (包括计算属性)、一个响应式对象、一个 getter 函数、或多个数据源组成的数组： -->
    <div>inputVal: <input type="text" v-model="inputVal" /></div>
    <div>
      <label for="">num1:</label>
      <input type="number" v-model="num1" />
      <label for="">num2:</label>
      <input type="number" v-model="num2" />
      <div>求和：{{ sumNum }}</div>
    </div>
    <hr />
    <div>
      <input type="text" v-model="ruser.name" />
      <input type="text" v-model="ruser.sex" />
      <input type="text" v-model="ruser.love.lanqiu" />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'dayStuDemo34',
}
</script>

<script lang="ts" setup>
import { computed, reactive, ref, watch, watchEffect } from 'vue'

// ref (包括计算属性)
const inputVal = ref('默认值')
const num1 = ref(0)
const num2 = ref(0)

const ruser = reactive({
  name: '站起来',
  sex: '男',
  love: {
    lanqiu: '喜欢',
  },
})
//监听响应式变量
watch(inputVal, (newVal, oldVal) => {
  console.log(newVal, 'ref:newVal')
  console.log(oldVal, 'ref:oldVal')
})
watchEffect(() => {
  console.log(inputVal.value, 'watchEffect:inputVal')
})

// 监听计算属性
const sumNum = computed(() => {
  return num1.value + num2.value
})
watch(sumNum, (newVal, oldVal) => {
  console.log(newVal, 'computed:newVal')
  console.log(oldVal, 'computed:oldVal')
})

watchEffect(() => {
  console.log(sumNum.value, 'watchEffect:sumNum.value')
})

//监听getter 函数
watch(
  () => inputVal.value,
  (newVal, oldVal) => {
    console.log(newVal, 'getter:newVal')
    console.log(oldVal, 'getter:oldVal')
  },
)
watchEffect(() => {
  console.log((() => inputVal.value)(), 'watchEffect:(() => inputVal.value)()')
})

// getter 函数2
watch(
  () => num1.value * num2.value,
  (newVal, oldVal) => {
    console.log('num1.value * num2.value')

    console.log(newVal, 'getter2:newVal')
    console.log(oldVal, 'getter2:oldVal')
  },
)
watchEffect(() => {
  const num66 = (() => num1.value * num2.value)()
  console.log(num66, 'watchEffect:( () => num1.value * num2.value)()')
})

// 多个数据源组成的数组
watch(
  [inputVal, () => num1.value * num2.value, () => inputVal.value, () => num1.value + num2.value],
  ([val1, val2, val3, val4]) => {
    console.log(val1, 'arr1:newVal')
    console.log(val2, 'arr2:newVal')
    console.log(val3, 'arr3:newVal')
    console.log(val4, 'arr4:newVal')
  }
)

watchEffect(() => {
  // const num66 = (() => num1.value * num2.value)()
  // const num88 = (() => num1.value + num2.value)()
  // const inval = inputVal.value

  const [inputval, cheng, ival, sum] = [
    inputVal,
    () => num1.value * num2.value,
    () => inputVal.value,
    () => num1.value + num2.value
  ]

  console.log(
    inputval,
    cheng,
    ival,
    sum,
    '#watchEffect:[inputVal, () => num1.value * num2.value, () => inputVal.value, () => num1.value + num2.value]'
  )
})

watchEffect(() => {
  console.log(inputVal, '我就不value')
})

// 注意，你不能直接侦听`响应式对象`的属性值，例如以下错误示例:
// watch(ruser.name,(newVal, oldVal) => {

// })
// 可以使用 getter 侦听`响应式对象`的属性值
watch(
  () => ruser.name,
  (newVal, oldVal) => {
    console.log(newVal, '`响应式对象`的属性值:newVal')
    console.log(oldVal, '`响应式对象`的属性值:oldVal')
  }
)

// 把整个对象传进来
// 直接给 watch() 传入一个响应式对象，会`隐式地创建一个深层侦听器`——该回调函数在所有嵌套的变更时都会被触发：
watch(ruser, (newVal, oldVal) => {
  console.log(newVal, '`响应式对象`:newVal')
  console.log(oldVal, '`响应式对象`:oldVal')
})

// 显式地加上 deep 选项，强制转成深层侦听器：
watch(
  ruser,
  (newVal, oldVal) => {
    console.log(newVal, '`响应式对象-强制转成深层侦听器`:newVal')
    console.log(oldVal, '`响应式对象-强制转成深层侦听器`:oldVal')
  },
  {
    deep: true
  }
)

// 显式地加上 deep 选项，强制转成浅层侦听器：
watch(
  ruser,
  (newVal, oldVal) => {
    console.log(newVal, '`响应式对象-强制转成浅层侦听器`:newVal')
    console.log(oldVal, '`响应式对象-强制转成浅层侦听器`:oldVal')
  },
  {
    deep: false
  }
)

// 即时回调的侦听器
// 在监听数据改变之前，先触发一次
watch(
  inputVal,
  (newVal, oldVal) => {
    console.log(newVal, 'ref:newVal')
    console.log(oldVal, 'ref:oldVal')
  },
  {
    // 先触发一次
    // immediate: true
  }
)

// 一次性侦听器
watch(
  inputVal,
  (newVal, oldVal) => {
    console.log('一次性侦听器')

    console.log(newVal, 'ref:newVal')
    console.log(oldVal, 'ref:oldVal')
  },
  {
    // 先触发一次
    // immediate: true,
    //once和immediate共同使用请注意， once 会把 immediate 触发的一次变化消费掉，once和immediate在一起使用每意义
    once: true
  }
)
</script>

<style lang="scss"></style>
