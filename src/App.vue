<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
// const route = useRoute(); // 当前路由
</script>
<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink :to="{ path: '/StuDemo1' }">选项式API</RouterLink>
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
        <RouterLink to="/StuDemo13">绑定 HTML class</RouterLink>
        <RouterLink to="/StuDemo14">绑定内联样式 Style</RouterLink>
        <RouterLink to="/StuDemo15">声明响应式状态 ref & reactive</RouterLink>
        <RouterLink to="/StuDemo16">Reactive包装注意事项</RouterLink>
        <RouterLink to="/StuDemo19">Reactive包装注意事项补充</RouterLink>
        <RouterLink to="/StuDemo17">Proxy</RouterLink>
        <RouterLink to="/StuDemo18">Reactive Proxy</RouterLink>
        <RouterLink to="/StuDemo20">额外的 ref 解包细节</RouterLink>
        <RouterLink to="/StuDemo21">响应式 API:工具函数</RouterLink>
        <RouterLink to="/StuDemo22">shallowReactive() & shallowReadonly()</RouterLink>
        <RouterLink to="/StuDemo23">shallowRef() & triggerRef()</RouterLink>
        <RouterLink to="/StuDemo24">toRaw() & markRaw()</RouterLink>
        <RouterLink to="/StuDemo25">customRef()</RouterLink>
        <RouterLink to="/StuDemo26"
          >effectScope() & getCurrentScope() & onScopeDispose() 案例1</RouterLink
        >
        <RouterLink to="/StuDemo27">改造effectScope渲染数据</RouterLink>
        <RouterLink to="/StuDemo28">effectScope案例2</RouterLink>
        <RouterLink to="/StuDemo29">effectScope案例3</RouterLink>
        <RouterLink to="/StuDemo30">effectScope案例4</RouterLink>
      </nav>
    </div>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style scoped lang="scss"></style>
