<!--
在 Vue 3 中，provide 和 inject 是一对用于跨层级组件间通信的 API。它们可以让你将数据从一个祖先组件传递到任意深度的后代组件，而无需通过 props 一层一层地传递

!provide 的作用:provide 用于在祖先组件中声明可以被后代组件访问的数据
  核心特点：
    1、数据在 provide 中定义，并通过 inject 在后代组件中使用。
    2、数据的传递不依赖组件的层级结构，无论后代组件嵌套多深，都可以直接使用。
  基本使用方法：
    1、祖先组件：使用 provide在祖先组件中，通过 provide 将数据暴露出去：
    2、后代组件：使用 inject在后代组件中，通过 inject 使用数据：
  使用场景
    1、跨层级传递数据：避免通过多层 props 和 emit 的繁琐操作。
    2、全局或局部共享状态：例如主题设置、语言切换、用户信息等。
    3、组件库开发：在复杂组件中传递状态和方法（如表单组件的上下文信息）。
  数据响应式：
    1、在 Vue 3 中，provide 支持响应式数据。当使用响应式数据时，后代组件会自动更新。
    2、如果没有找到对应的 provide 数据，inject 会返回 undefined。可以为 inject 提供一个默认值。
  provide和inject的限制:
    1、只能在组件上下文中使用，不能在组件外部调用。
    2、provide 提供的数据仅对子孙组件可见，无法直接反向通信（即子组件无法直接修改 provide 的数据，除非是响应式的）
  与 Pinia 的区别
    1、provide/inject 是轻量级的工具，适合用于特定场景的局部状态共享。
    2、Pinia 是 Vue 的官方状态管理库，适合管理复杂的全局状态。
  总结
    provide 和 inject 提供了一种简洁、高效的跨层级数据传递方式。
    它们是 Vue 3 的功能增强，避免了繁琐的 props 和 emit，适合用于局部状态共享。
    如果需要管理复杂的全局状态，推荐使用 Pinia 或 Vuex。
-->
<template>
  <div id="wrap">
    <h1>插槽案例</h1>
    <div class="group1">
      <SonDemo17 :chide :slist="list5">
        <template #gridBoxItem="Item">
          <div class="newlist">
            <h4>{{ Item.title }}</h4>
            <p>{{ Item.descript }}</p>
          </div>
        </template>
      </SonDemo17>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'dayStuDemo43',
}
</script>

<script lang="ts" setup>
import { onMounted, provide, ref, type Ref } from 'vue'
import SonDemo17 from './components/SonDemo17.vue'
import { type IDemo5List } from '@/service/types/StuDemo43Types'
import { getList } from '@/service/day20241226/StuDemo43Data'
import { myInjectionKey } from './components/keys'

/**********************************父组件传子组件的数 list5请求过来的数据(模拟)  chide是一个响应式的变量*************************************/
const list5 = ref<IDemo5List[]>([])
const chide = ref('蛋糕')
onMounted(async () => {
  //使用钩子函数 挂载前使用异步函数完成数据请求
  list5.value = await getList()
})

/**********************************跨层级传递数据*************************************/
const heshibi = ref('爷爷的和氏璧')
provide<{ heshibi: Ref<string> }>(myInjectionKey, {
  heshibi,
})
provide('foo', {
  name: 'wahshsh',
})
</script>

<style lang="scss">
.group1 {
  border: 3px solid rgb(203, 50, 175);
  margin: 10px;
  padding: 10px;
}
</style>
