<template>
  <div id="wrap">
    <h1>effectScope案例3</h1>
    <div v-if="isShow">
      <h3>Counter A: {{ adc.countA }}</h3>
      <h3>Counter B: {{ adc.countB }}</h3>
      <button @click="adc.incrementA">Increment A</button>
      <button @click="adc.incrementB">Increment B</button>
      <button @click="stopScope">Stop Scope</button>
    </div>
    <hr>


    <div v-if="isStopped">
      <h3>Scope has been stopped.</h3>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, type Ref, effectScope, EffectScope, onScopeDispose } from 'vue'

// 定义返回对象的类型
interface CounterState {
  countA: Ref<number>
  countB: Ref<number>
  incrementA: () => void
  incrementB: () => void
}

let scope: EffectScope // 用于存储 effectScope 实例
const isShow = ref(false)
// 创建 effectScope 作用域
function setupScope(): Promise<CounterState> {
  scope = effectScope() // 创建一个新的作用域
  return new Promise((resolve) => {
    // 在该作用域中运行所有的响应式状态
    scope.run(() => {
      const countA = ref(0)
      const countB = ref(0)
      const incrementA = () => countA.value++
      const incrementB = () => countB.value++
      // 注册一个清理回调，当作用域被停止时调用
      onScopeDispose(() => {
        console.log('作用域停止, 清理资源')
      })
      // 返回需要在模板中使用的状态
      resolve({
        countA,
        countB,
        incrementA,
        incrementB,
      })
    })
  })
}
let adc: CounterState
const initScope = async () => {
  // 调用 setupScope，初始化作用域中的状态
  adc = await setupScope()
  console.log(adc.countA)
  isShow.value = true
}
initScope()
// 停止作用域的函数
const isStopped = ref(false)
function stopScope() {
  if (scope) {
    scope.stop() // 停止作用域并触发销毁回调
    isStopped.value = true // 设置作用域已停止
  }
}
</script>
