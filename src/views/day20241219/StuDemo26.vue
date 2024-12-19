<!--
!effectScope:
  作用：
    1、effectScope 的作用是帮助你更好地组织和管理这些响应式副作用，确保它们在适当的时候被创建和销毁
    2、创建一个独立的响应式作用域，允许在该作用域内管理响应式数据的生命周期。当你调用 effectScope() 时，会返回一个作用域对象，这个对象包含以下属性和方法
  语法：const scope = effectScope(detached = false)
    参数：detached (可选)：false(默认值)/true
            false: 作用域会被自动附加到父作用域，如果存在的话
            true: 创建一个独立的作用域，不依赖于任何父作用域。
  方法：
    1、run(fn)：在作用域内运行一个函数，并捕获该函数中创建的所有响应式副作用，使其绑定到当前作用域。
      参数：fn: 在作用域内执行的函数。
      返回值：fn 的执行结果。
      ?ps:如果作用域已停止，会返回 undefined。
    2、stop()：销毁当前作用域，停止所有绑定到该作用域的响应式副作用，并执行通过 onScopeDispose 注册的清理逻辑
      无参数
      无返回值
  属性：
    1、active：标记作用域是否处于激活状态。
      类型：boolean
      ?ps:当作用域被销毁时，active 会变为 false。
    2、effects：存储作用域中创建的所有响应式副作用（如 effect）。
      类型：ReactiveEffect[]
      ?ps:这是内部实现的一部分，通常用于调试。
    3、scopes：存储所有子作用域。
      类型：EffectScope[]
      ?ps:当一个作用域嵌套另一个作用域时，子作用域会被记录在父作用域的 scopes 中。

  ?总结:effectScope 的核心功能是隔离和管理副作用的生命周期，通过 run 和 stop 方法，可以动态地运行或销毁作用域内的逻辑。此外，通过嵌套作用域和清理机制，可以有效避免内存泄漏和资源浪费

!getCurrentScope:
  作用：获取当前的响应式作用域，常用于确认当前代码是否运行在一个有效作用域内。


!onScopeDispose：
  作用：注册一个回调函数，当作用域销毁时（scope.stop() 调用），会自动执行这个回调，用于清理资源。
  问题：effectScope作用域可以使用stop停止，为什么还要使用onScopeDispose清理资源
    1、特定资源清理：
      1-1、stop 方法会停止所有在作用域内创建的响应式副作用，但有时候可能需要在作用域停止时执行一些特定的清理操作，这些操作可能不是直接与响应式数据相关的。例如，关闭网络请求、清除定时器、释放文件句柄等
      1-2、onScopeDispose 允许注册一个回调函数，这个回调函数会在 stop 方法被调用时执行，专门用于处理这些特定的清理任务
    2、代码组织：
      使用 onScopeDispose 可以使代码更加模块化和易于维护。可以在创建副作用的地方立即注册相应的清理逻辑，这样可以确保逻辑的完整性和一致性
    3、调试和日志：onScopeDispose 提供了一个明确的钩子，用于在作用域销毁时执行调试或日志记录操作。这可以更好地了解资源释放的情况，特别是在复杂的应用中。
    4、灵活性：有时候在作用域停止时执行一些复杂的清理逻辑，这些逻辑可能不适合直接在 stop 方法中实现。onScopeDispose 提供了更大的灵活性，允许注册多个清理回调，并且这些回调可以是异步的或包含复杂的逻辑。
-->
<template>
  <div id="wrap">
    <h1 ref="wrapRef">effectScope() & getCurrentScope() & onScopeDispose()</h1>
  </div>
</template>

<script lang="ts" setup>
import { ref, effectScope, getCurrentScope, onScopeDispose } from 'vue'

// effectScope:创建一个独立的响应式作用域，允许在该作用域内管理响应式数据的生命周期。
const scope = effectScope()
scope.run(() => {
  const state = ref(0)
  const interval = setInterval(() => {
    state.value++
    console.log(state.value)
  }, 1000)

  //active：标记作用域是否处于激活状态。
  console.log(scope.active) // true

  //getCurrentScope：获取当前的响应式作用域，常用于确认当前代码是否运行在一个有效作用域内
  const scope1 = getCurrentScope()
  console.log(scope1 ? '有效作用域' : '无效作用域')

  //onScopeDispose：注册一个回调函数，当作用域销毁时（scope.stop() 调用），会自动执行这个回调，用于清理资源。
  onScopeDispose(() => {
    clearInterval(interval) // 在作用域销毁时清理计时器
    console.log('效应范围处理')
  })
})
// 停止作用域，清理所有绑定和副作用 销毁作用域
scope.stop()
console.log(scope.active) // false
</script>
