<!--
shallowRef
  功能：shallowRef 是 Vue 提供的一种浅层响应式引用（ref）。它只使引用本身响应式，而不会递归地让内部嵌套的对象属性响应式。
  适用场景：
    1、数据对象较大，且内部嵌套复杂，不希望深层次响应式消耗性能。
    2、只需监听引用本身的变化，或者希望在某些情况下手动控制响应式更新。

triggerRef
  功能：triggerRef 是用于手动触发浅层引用（或普通引用）的依赖更新的工具函数。即使引用本身未发生变化，但你希望强制让 Vue 更新依赖。
  适用场景：
    1、使用 shallowRef 时，修改对象内部数据但引用本身不变，需要手动通知 Vue 更新。
    2、一些高性能优化场景下，可以通过手动控制响应式更新时机。

功能	              shallowRef	                                  triggerRef
核心作用	          创建一个浅层响应式引用，仅监听引用本身变化。	    手动触发一个浅层引用或普通引用的依赖更新。
响应式更新	        自动更新外层数据的依赖。	                       强制更新依赖，尤其是当嵌套数据发生变化时。
适用场景	          高性能、避免不必要的深层响应式。	                配合 shallowRef，或对普通引用进行手动控制。
-->
<template>
  <div id="wrap">
    <h1>shallowRef() & triggerRef()</h1>
    <p class="group">
      <button type="button" @click="editshallowRef">修改shallowRef</button>
      <button type="button" @click="triggerRefHandler">强制触发依赖于一个浅层 ref 的副作用</button>
    </p>

    <div class="group">
      {{ slrefdataObj3.count }}
    </div>

    <div class="group">
      <ul>
        <li v-for="item in slrefdataObj3.strArr" :key="item">{{ item }}</li>
      </ul>
    </div>

    <div class="group">
      <ul>
        <li v-for="(item, name) in slrefdataObj3.user" :key="name">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'dayStuDemo23',
}
</script>

<script lang="ts" setup>
import { shallowRef, triggerRef } from 'vue'
const dataObj3 = {
  count: 0,
  strArr: ['php', '刘强东', '马云', '马化腾', '任正非'],
  user: {
    name: '刘强东',
    sex: 'nan',
    age: 42,
    aihao: {},
  },
}
const slrefdataObj3 = shallowRef(dataObj3)
const editshallowRef = () => {
  // 直接使用 .value 赋值是可以的，深层不行
  // slrefdataObj3.value = {
  //   count: 3333,
  //   strArr: ['php', '刘强东3333', '马云', '马化腾', '任正非'],
  //   user: {
  //     name: '刘强东',
  //     sex: 'nan',
  //     age: 42,
  //     aihao: {}
  //   }
  // }

  slrefdataObj3.value.count++
  console.log(slrefdataObj3.value.count, 'slrefdataObj3.value.count')
}
const triggerRefHandler = () => {
  triggerRef(slrefdataObj3)
}
</script>

<style lang="scss">
.group {
  padding: 20px;
  border: 2px solid #abcdef;
  margin: 10px 0;
}
</style>
