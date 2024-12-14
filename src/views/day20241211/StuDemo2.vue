<template>
  <div id="wrap">
    <h1>组合式API</h1>
    <!-- 插值表达式 -->
    <p>{{ str }}</p>
    <p>{{ num }}</p>
    <img :src="imgSrc" alt="" />
    <img :src="src" alt="" /><br />
    <!-- 按钮方法绑定-->
    <button @click="add">增加</button>
    <p>{{ data }}</p>
    <!-- 数据双向绑定 v-model="tests" -->
    <p>{{ test }}</p>
    <input type="text" v-model="test" /><br />
    <!-- 改变按钮 -->
    <button @click="etid">改变</button>
  </div>
</template>
<script lang="ts">
/*
setup 的作用：
    setup 是 Vue 组件的一个选项函数，执行时机早于组件生命周期中的 beforeCreate 和 created 钩子。它的主要作用是为组件提供一个更简洁、灵活的方式来组织逻辑。具体来说，setup 的功能包括：
特点：
  1、响应式状态定义：通过 Vue 提供的 API（如 ref 和 reactive），在 setup 中定义响应式数据。
  2、生命周期管理：在 setup 中使用特定的生命周期钩子（如 onMounted、onUnmounted）来替代传统选项式 API 中的生命周期方法。
  3、依赖注入：通过 inject 和 provide 在组件层级之间传递依赖。
  4、返回值供模板使用：setup 函数返回的对象或值将暴露给组件的模板。
ps:
  1、setup是Vue3中一个新的配置项，值是一个函数，它是 Composition API “表演的舞台”，
  2、组件中所用到的：数据、方法、计算属性、监视......等等，均配置在setup中。

ref的作用:
  1、创建响应式数据：ref 会把一个普通的值（如数字、字符串、对象等）包装成一个响应式对象。
  2、自动追踪依赖：当使用 ref 包装的值在模板或计算属性中被访问时，Vue 会自动追踪这些依赖并在值发生变化时触发更新。
  3、保证响应性行为一致：ref 提供了统一的方式处理基本类型和引用类型的数据。
为什么需要导入ref?
  ref 是 Vue 提供的一个函数，它并不是 JavaScript 原生的功能。为了使用它，你必须从 Vue 中显式导入。
设计原因：
  1、避免全局污染：Vue 的 Composition API 遵循模块化设计，所有工具都需要显式导入以避免污染全局命名空间
  2、更好的 Tree Shaking 支持：通过显式导入，打包工具（如 Webpack、Vite 等）可以轻松实现 Tree Shaking，只引入实际使用的部分，减少最终打包的大
  小。
ps:当访问ref声明的数据时，一定要加.value
ref 和 reactive 的对比
  特性	              ref	                      reactive
使用场景	        基本类型和引用类型都可	      主要用于对象或数组
访问方式	        通过 .value	               直接访问属性
响应性类型深度	   深响应性仅在对象时生效	      自动实现深响应性
易用性	          适合处理单个值	            适合处理复杂的嵌套结构
Vue 选择让开发者显式地使用 ref 或 reactive 创建响应式数据，而不是默认响应所有数据，是出于以下原因：
    1、性能考虑：响应式系统需要追踪依赖和变化，若默认响应所有变量，会引入不必要的开销。
    2、明确性：通过显式声明，开发者能清楚地知道哪些数据是响应式的，避免无意中引入复杂的响应链。
    3、模块化设计：Vue 3 的 Composition API 强调灵活性，ref 和 reactive 提供了更细粒度的控制。
*/

import { ref } from 'vue'
import imgSrc from '@/assets/images/7.png'
export default {
  name: 'dayStuDemo2',
  setup() {
    // const str: string = '你好世界'
    const str = ref<string>('你好世界')
    const num: number = 123
    const data = ref<number>(123) // 响应式变量  响应式变量，会根据UI刷新进行刷新
    const test: string = '小明' // 普通变量
    const src = ref<string>(imgSrc)
    const add = () => {
      data.value++
    }
    const etid = (): void => {
      str.value = '我是普通变量，不支持UI刷新'
    }
    return {
      str,
      num,
      imgSrc,
      data,
      add,
      test,
      etid,
      src,
    }
  },
}
</script>
<style lang="scss"></style>
