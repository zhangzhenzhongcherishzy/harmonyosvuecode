<template>
  <div id="wrap">
    <h1>选项式API</h1>
    <!-- 插值表达式:{{}} -->
    <p>{{ str }}</p>
    <p>{{ num }}</p>
    <!--按钮方法绑定  -->
    <button @click="click">按钮</button>
    <p>{{ data }}</p>
    <button @click="add">求和</button>
    <p>{{ sum }}</p>
    <!-- 数据双向绑定 v-model="tests" -->
    <p>{{ test }}</p>
    <input type="text" v-model="test" />
    <!-- 点击修改文本 -->
    <button @click="edit">修改</button>
  </div>
</template>
<script lang="ts">
// const c = 100
export default {
  name: 'dayStuDemo1',
  // data() 返回的属性将会成为响应式的状态
  // 并且暴露在 `this` 上
  data() {
    const str: string = '你好世界'
    const num: number = 123
    const data: number = 123
    const sum: number = 0
    const test: string = '施雅典'
    return {
      str,
      num,
      data,
      sum,
      test,
    }
  },
  // methods 是一些用来更改状态与触发更新的函数
  // 它们可以在模板中作为事件处理器绑定
  methods: {
    click() {
      this.data++
    },
    // click: function () {
    // this.data++
    // },
    add: function () {
      this.sum = this.num + this.data
    },
    edit: function () {
      this.str = 'helloworld'
    },
  },
  // 生命周期钩子会在组件生命周期的各个不同阶段被调用
  // 例如这个函数就会在组件挂载完成后被调用
  mounted() {
    console.log(`The initial count is ${this.num}.`)
  },
}
</script>
<style lang="scss"></style>
