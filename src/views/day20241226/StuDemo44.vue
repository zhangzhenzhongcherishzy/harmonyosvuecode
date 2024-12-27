<!--
Vue 3 的生命周期钩子分为挂载前后、更新前后、卸载前后几个阶段，下面是完整的生命周期函数列表和对应的知识点、使用时机及场景

!1. 挂载阶段:
?onBeforeMount
  调用时机：
    1、在组件实例被挂载到 DOM 之前调用。
  使用场景：
    1、初始化与 DOM 无关的逻辑。
    2、在数据未渲染前设置预处理状态。
?onMounted
  调用时机：
    1、组件挂载到 DOM 后调用。
  使用场景：
    1、初始化与 DOM 相关的逻辑，如绑定事件或操作 DOM 元素。
    2、发送请求获取初始数据。

!2. 更新阶段
?onBeforeUpdate
  调用时机：
    1、组件更新之前，DOM 尚未更新。
  使用场景：
    1、在状态更新前记录旧值。
    2、对更新前的 DOM 做清理工作。
?onUpdated
  调用时机：
    1、组件更新完成后，DOM 已更新。
  使用场景：
    1、操作更新后的 DOM。
    2、对 UI 的调整，如滚动条定位或动画。

!3. 卸载阶段
?onBeforeUnmount
  调用时机：
    1、组件实例即将被卸载时调用。
  使用场景：
    1、释放资源，如清除定时器。
    2、解绑事件监听器。
?onUnmounted
  调用时机：
    1、组件实例已经被卸载时调用。
  使用场景：
    1、确认清理工作是否完成。
    2、移除与组件实例相关的全局数据。

!4. 渲染过程钩子
?onRenderTracked
  调用时机：
    1、依赖被追踪时调用，用于调试依赖收集情况。
  使用场景：
    1、调试组件依赖更新。
    2、监控响应式数据变更。
    3、用于调试组件中哪些数据触发了依赖追踪。
?onRenderTriggered
  调用时机：
    1、响应式依赖触发组件重新渲染时调用。
  使用场景：
    1、调试和优化性能。
    2、识别不必要的依赖。
    3、用于监控哪些依赖导致了组件重新渲染

!5.异常捕获钩子
?onErrorCaptured
  调用时机：
    当子组件中抛出未捕获的错误时调用。
  使用场景：
    用来处理错误或记录日志。

!6、缓存组件钩子:这些钩子适用于使用 <KeepAlive> 包裹的组件。
?onActivated
  调用时机：
    被 <KeepAlive> 包裹的组件被激活时调用。
  使用场景：
    重新加载数据或恢复状态。
?onDeactivated
  调用时机：
    被 <KeepAlive> 包裹的组件被停用时调用。
  使用场景：
    保存状态或清理工作。

!7、服务端渲染钩子
?onServerPrefetch
  调用时机：
    在服务端渲染时，在组件渲染之前调用。
  使用场景：
    预取数据以用于服务端渲染。

!总结
  在组件的完整生命周期中，生命周期钩子按照以下顺序调用：
    1、挂载阶段
      onBeforeMount → onMounted
    2、更新阶段
      onBeforeUpdate → onUpdated
    3、卸载阶段
      onBeforeUnmount → onUnmounted
    4、调试 & 优化：
      onRenderTracked → onRenderTriggered
    5、错误处理：
      onErrorCaptured
    6、缓存组件
      onActivated onDeactivated
    7、服务端渲染
      onServerPrefetch
-->
<template>
  <div id="wrap">
    <h1>组合式 API：生命周期钩子</h1>
    <div>
      <p @click="num++">数字累加：{{ num }}</p>
    </div>
    <hr />

    <ul>
      <li v-for="user in users" :key="user.id">{{ user.name }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  name: 'dayStuDemo44',
}
</script>

<script lang="ts" setup>
import {
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onMounted,
  onUnmounted,
  onUpdated,
  ref,
} from 'vue'

const num = ref(100)

// 定义用户类型
interface IUser {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

const users = ref<IUser[]>([])

onMounted(async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  users.value = await response.json()
})

// 注册一个回调函数，在组件挂载完成后执行。
onMounted(() => {
  console.log('onMounted:在组件挂载完成后执行')
})

// 注册一个回调函数，在组件因为响应式状态变更而更新其 DOM 树之后调用。
onUpdated(() => {
  console.log('onUpdated:在组件因为响应式状态变更而更新其 DOM 树之后调用')
})

// 注册一个回调函数，在组件实例被卸载之后调用
onUnmounted(() => {
  console.log('onUnmounted:在组件实例被卸载之后调用')
})

// 注册一个钩子，在组件被挂载之前被调用。
onBeforeMount(() => {
  console.log('onBeforeMount:在组件被挂载之前被调用')
})

// 注册一个钩子，在组件即将因为响应式状态变更而更新其 DOM 树之前调用。
onBeforeUpdate(() => {
  console.log('onBeforeUpdate:，在组件即将因为响应式状态变更而更新其 DOM 树之前调用。')
})

// 注册一个钩子，在组件实例被卸载之前调用。
onBeforeUnmount(() => {
  console.log('onBeforeUnmount:在组件实例被卸载之前调用')
})
</script>

<style lang="scss"></style>
