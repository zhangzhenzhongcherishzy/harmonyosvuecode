<template>
  <div id="wrap">
    <h1 ref="wrapRef">改造effectScope渲染数据</h1>
    <!-- 渲染作用域中的变量 -->
    <p>计数值：{{ count }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref, effectScope, getCurrentScope, onScopeDispose } from 'vue'

// 创建响应式变量
const count = ref(0)

// 创建 effectScope 实例
const scope = effectScope()

// 在作用域内运行逻辑
scope.run(() => {
  // 定义计时器逻辑
  const interval = setInterval(() => {
    count.value++
    console.log(count.value) // 打印计数值
  }, 1000)

  // 验证当前是否处于有效作用域
  const currentScope = getCurrentScope()
  console.log(currentScope ? '有效作用域' : '无效作用域')

  // 注册清理回调，当作用域销毁时清除计时器
  onScopeDispose(() => {
    clearInterval(interval) // 清理计时器
    console.log('作用域销毁，清理资源')
  })
})

// 停止作用域
setTimeout(() => {
  scope.stop()
  console.log('作用域已停止')
}, 5000)
</script>
