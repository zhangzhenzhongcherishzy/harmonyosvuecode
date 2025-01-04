<!--
shallowReactive():
  作用:创建一个“浅层响应式”的对象，仅对对象的第一层属性是响应式的，深层嵌套属性不具备响应性。
  特点:
    1、第一层属性可以被追踪并触发视图更新。
    2、深层嵌套的属性不会被代理为响应式。

shallowReadonly()
  作用:创建一个“浅层只读”的对象，仅限制对象第一层属性不可修改，深层嵌套属性仍然是可变的。
  特点:
    1、第一层属性无法修改（会抛出警告或错误）。
    2、深层嵌套的属性可以修改，但它们本身不是响应式的。

工具函数	             适用场景
shallowReactive	      对大数据对象或性能敏感场景，仅需要第一层属性响应式，深层属性无需跟踪时使用。
shallowReadonly	      限制第一层属性只读，深层属性允许修改，但无需深层次响应式时使用，常用于保护外部数据。
isProxy	              用于判断数据是否为 Vue 代理，调试或某些动态处理场景中验证数据是否被 Vue 管理。
-->
<template>
  <div id="wrap">
    <h1>shallowReactive() & shallowReadonly()</h1>
    <p class="group">
      <button type="button" @click="editshallowReactive">修改shallowReactive</button>
    </p>
    <hr />

    <p class="group">
      {{ slrdataObj3.count }}
    </p>
    <hr />

    <ul class="group">
      <li v-for="item in slrdataObj3.strArr" :key="item">{{ item }}</li>
    </ul>
    <hr />

    <ul class="group">
      <li v-for="(item, name) in slrdataObj3.user" :key="name">{{ item }}</li>
    </ul>
    <hr />

    <!-- <button @click="updata()">手动更新</button> -->
    <!-- <p>{{ num }}</p> -->
  </div>
</template>

<script lang="ts">
export default {
  name: 'dayStuDemo22',
}
</script>

<script lang="ts" setup>
import { isProxy, shallowReactive, shallowReadonly, triggerRef, ref } from 'vue'

console.log(ref,triggerRef);

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
const slrdataObj3 = shallowReactive(dataObj3)
const slrydataObj3 = shallowReadonly(slrdataObj3)
console.log(isProxy(slrdataObj3))
console.log(isProxy(slrydataObj3))

const editshallowReactive = () => {
  // 修改第一层
  // slrdataObj3.count++
  // slrdataObj3.strArr = ['234', '234']
  // slrdataObj3.user = {
  //   name: '刘强东222',
  //   sex: 'nan',
  //   age: 42,
  //   aihao: {}
  // }

  // 修改不是第一层
  slrdataObj3.user.name = '任正非'

  // slrydataObj3.user.name = '任正非'

  // 无法为“user”赋值，因为它是只读属性
  // slrydataObj3.user = {
  //   name: '许家印3333',
  //   sex: 'nan',
  //   age: 42,
  //   aihao: {}
  // }
}
</script>

<style lang="scss">
.group {
  padding: 20px;
  border: 2px solid #abcdef;
  margin: 10px 0;
}
</style>
