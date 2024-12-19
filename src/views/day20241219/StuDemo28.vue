<template>
  <div id="wrap">
    <h1>effectScope案例2</h1>
    <!-- 第一次 -->
    <button type="button" @click="runtimer1Scope">runtimer1Scope</button>
    <button type="button" @click="stoptimer1Scope">stoptimer1Scope</button>
    <hr />

    <!-- 第二次 -->
    <button type="button" @click="runtimer2Scope">runtimer2Scope</button>
    <button type="button" @click="stoptimer2Scope">stoptimer2Scope</button>
    <hr />

    <!-- 干扰 -->
    <button type="button" @click="ganrao">干扰</button>
    <hr>
  </div>
</template>

<script lang="ts" setup>
import { ref, type Ref, effectScope, EffectScope, onScopeDispose, reactive } from 'vue'

// 创建一个计时器的组合函数;使用 effectScope 创建作用域;effectScope() 的返回值类型是 EffectScope，这是 Vue 的内置类型。可以显式声明返回值类型
function useTimer(): EffectScope {
  const scope = effectScope()
  return scope
}
function srun(scope: EffectScope, step = 1000): { time: Ref<number> } {
  const time = ref(0)
  let interval: ReturnType<typeof setInterval>
  scope.run(() => {
    //开启计时器
    interval = setInterval(() => {
      console.log(time.value)
      time.value++
    }, step)
    // 在作用域销毁时清理定时器
    onScopeDispose(() => {
      clearInterval(interval)
      console.log('计时器停止，资源被清理。')
    })
  })
  return { time }
}

const rac = reactive<Ref<number>[]>([])
//使用作用域1
const timer1 = useTimer()
console.log(timer1)
const runtimer1Scope = () => {
  const { time } = srun(timer1)
  console.log(time)
  rac.push(time)
  console.log(rac)
}
const stoptimer1Scope = () => {
  timer1.stop()
}
//使用作用域2
const timer2 = useTimer()
const runtimer2Scope = () => {
  const { time } = srun(timer2)
  rac.push(time)
}
const stoptimer2Scope = () => {
  timer2.stop()
}
//干扰
console.log(rac)
const ganrao = () => {
  if (rac.length > 0) {
    rac[0].value = 20000
    console.log('干扰成功:', rac[0].value)
  }
}
</script>
