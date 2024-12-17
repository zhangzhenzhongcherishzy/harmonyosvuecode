<!--
toRaw()：用于获取原始对象（非响应式版本）
  功能：
    1、从一个响应式对象中提取原始数据。
    2、返回原始的、未经代理的对象。
    3、常用于调试、比较等场景
  应用场景：
    1、避免嵌套响应式时的循环引用问题。
    2、对响应式对象进行严格相等性比较。

markRaw()：用于标记一个对象为非响应式对象。
  功能：
    1、被 markRaw() 包裹的对象不会被 Vue 转化为响应式。
    2、适合存储不需要响应式的复杂数据（如第三方库数据、DOM 节点）。
  应用场景：
    1、大型对象或结构（如图表库数据）不需要响应式。
    2、避免对第三方对象或库的意外干扰。
总结：
  1、toRaw()：从响应式对象获取原始数据。
  2、markRaw()：防止对象被 Vue 转化为响应式。
-->

<template>
  <div id="wrap">
    <h1>toRaw() & markRaw()</h1>
    <div class="group">
      <button type="button" @click="editmarkRaw">修改markRaw</button>
    </div>
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

    <div class="group">
      <ul>
        <li v-for="(item, name) in slrefdataObj3.markFoo" :key="name">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'dayStuDemo24',
}
</script>

<script lang="ts" setup>
import { isReactive, markRaw, reactive } from 'vue'

const foo = markRaw([243, 23, 42, 34, 2, 42, 4])
console.log(isReactive(reactive(foo))) // false

const dataObj3 = {
  count: 0,
  strArr: ['php', '刘强东', '马云', '马化腾', '任正非'],
  user: {
    name: '许家印',
    sex: 'nan',
    age: 42,
    aihao: {}
  }
}

const slrefdataObj3 = reactive({
  ...dataObj3,
  markFoo: foo
})

const editmarkRaw = () => {
  // 以下属性都有响应性，测试的时候不要和 非响应性的 markFoo在一起测试，否则会触发非相应属性渲染
  // slrefdataObj3.count++
  // slrefdataObj3.strArr.push('3432423')
  // slrefdataObj3.user.name = '粥杰伦'

  // slrefdataObj3.markFoo.push(999999)
}
</script>

<style lang="scss">
.group {
  padding: 20px;
  border: 2px solid #abcdef;
  margin: 10px 0;
}
</style>
