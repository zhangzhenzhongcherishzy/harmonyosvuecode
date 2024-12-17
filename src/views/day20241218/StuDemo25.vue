<!--
customRef() 的作用：
  Vue 3 提供的一个工具函数，用于创建自定义的响应式 ref。通过它，你可以控制 ref 的 依赖追踪 和 触发更新 的行为，适合需要对数据更新进行细粒度控制的场景，比如 防抖、节流、格式化 等。

使用场景
  1、customRef() 的主要作用是增强对 ref 的更新逻辑控制，以下是常见场景：
  2、防抖和节流
  3、格式化输入值
  4、监听更新并增加逻辑

customRef() 的核心在于：
  1、手动控制响应式的 track() 和 trigger()。
  2、实现灵活的响应式逻辑。
-->
<template>
  <div id="wrap">
    <h1></h1>
    <div>
      <input type="text" v-model="text" />
      <button type="button" @click="editCustomRef">修改自定义ref对象（防抖）</button>
    </div>
    <hr>

    <input type="text" v-model="text1" />
    <p>{{ text1 }}</p>
    <hr>

    <input type="text" v-model="text2" placeholder="输入内容" />
    <p>延迟显示的文本：{{ text2 }}</p>
  </div>
</template>

<script lang="ts" setup>
import { useDebouncedRef,useUpperCaseRef,useDelayedRef} from '@/utils/useDebouncedRef'
//在防抖的场景下，当输入停止一定时间后才会触发依赖更新
const text = useDebouncedRef('王德发',500)
const editCustomRef = () => {
  text.value = '朋友别哭'
}
//创建一个 ref，将用户输入自动转为大写。
const text1 = useUpperCaseRef('hello')
text.value = 'world' // 设置值，自动转为 'WORLD'

//延迟一定时间更新值，用于节约性能消耗。
const text2 = useDelayedRef('', 1000)// 使用自定义 ref，延迟 1000 毫秒更新
</script>

<style lang="scss"></style>
