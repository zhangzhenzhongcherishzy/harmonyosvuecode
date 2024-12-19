<template>
  <div id="wrap">
    <h1>effectScope案例3</h1>
    <!-- 管理多个定时器 -->
    <button @click="createTimer">Add Timer</button>
    <div v-for="(timer, index) in timers" :key="index">
      <p>Timer {{ index + 1 }}: {{ timer.time }} seconds</p>
      <button @click="removeTimer(index)">Remove Timer</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, type Ref, effectScope, EffectScope, onScopeDispose } from 'vue'

interface ClassB {
  time: Ref<number>;
  scope: EffectScope;
}
// 创建一个计时器的组合函数
function useTimer():ClassB {
  const time = ref(0)
  let interval: ReturnType<typeof setInterval>
  // 使用 effectScope 创建作用域
  const scope = effectScope()
  scope.run(() => {
    // 开启计时器
    interval = setInterval(() => {
      time.value++
    }, 1000)
    // 在作用域销毁时清理定时器
    onScopeDispose(() => {
      clearInterval(interval)
      console.log('Timer stopped and resources cleaned up.')
    })
  })
  return { time, scope }
}
// 管理多个计时器
type TimesRef = Ref<ClassB[]>;
const timers:TimesRef = ref([])
// 创建新计时器
function createTimer() {
  const newTimer = useTimer()
  console.log(newTimer);
  timers.value.push(newTimer)
}
// 移除计时器并清理作用域
function removeTimer(index: number) {
  const timerToRemove = timers.value[index]
  if (timerToRemove) {
    timerToRemove.scope.stop() // 停止该作用域并触发清理
  }
  timers.value.splice(index, 1) // 从列表中移除计时器
}
</script>
