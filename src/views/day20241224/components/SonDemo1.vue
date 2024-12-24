<template>
  <div>
    <!-- 场景一 -->
    <!-- <h3>标题:{{ props.title }}</h3> -->
    <!-- <p>描述:{{ props.count }}</p> -->

    <!-- 场景二 -->
    <h3>标题:{{ props.title }}</h3>
    <p>描述:{{ props.descript }}</p>
  </div>
</template>

<script setup lang="ts">
// 场景一
// const props = defineProps({
//   title: String,
//   count: Number,
// })

// 场景二
/*
1. 定义 props 的基本规则
  1-1、defineProps 接收一个对象作为参数，用来定义该组件支持的 props 属性。
  1-2、每个 props 的键名是属性名，值是该属性的类型、默认值、校验规则等配置
2. 参数解析
  2-1、title: String
    （1）title 是一个 props 属性，期望父组件传入的值是 String 类型
    （2）如果父组件没有传入 title，它的值将为 undefined（非必传）
  2-2、descript：descript 是一个带有详细配置的 props 属性：
    （1）type: [String, Number]：表示 descript 的值可以是 String 或 Number 类型。
    （2）required: true：表示 descript 是一个必传的属性。如果父组件没有传入 descript，会抛出一个错误警告。
*/
const props = defineProps({
  title: String,
  descript: {
    type: [String, Number],
    required: true,
  },
})
console.log(props.title, 'props.title')
</script>

<style></style>
