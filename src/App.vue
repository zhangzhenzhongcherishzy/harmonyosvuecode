<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>
<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/StuDemo1">选项式API</RouterLink>
        <RouterLink to="/StuDemo2">组合式API</RouterLink>
        <RouterLink to="/StuDemo3">改造组合式API</RouterLink>
        <RouterLink to="/StuDemo4">组合式API-自定义渲染-返回函数</RouterLink>
        <RouterLink to="/StuDemo5">组合式API-自定义渲染-JSX</RouterLink>
        <RouterLink to="/StuDemo6">setup 语法糖</RouterLink>
        <RouterLink to="/StuDemo7">setup 语法糖支持ts写法</RouterLink>
        <RouterLink to="/StuDemo8">模板语法-文本</RouterLink>
        <RouterLink to="/StuDemo9">模板语法-属性</RouterLink>
        <RouterLink to="/StuDemo10">内置指令</RouterLink>
        <RouterLink to="/StuDemo11">案例Tab切换</RouterLink>
        <RouterLink to="/StuDemo12">案例计算器</RouterLink>
        <!-- 提交测试 -->
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<style scoped lang="scss"></style>
