<!--
什么是 h 函数:
  h 函数是 Vue 3 中用来创建虚拟 DOM 节点（VNode）的一个工具函数。h 是 createElement 的缩写，用于以编程方式生成虚拟 DOM，替代模板语法的 JSX 或直接 HTML 模板在 Vue 3 的组合式 API 中，h 函数主要用于渲染函数（Render Function）。它允许开发者通过 JavaScript 的方式灵活地构建界面结构。
h 函数的作用:
  1、创建 VNode。（什么是 VNode？VNode 是 Vue 内部用于表示 DOM 结构的轻量级 JavaScript 对象，是虚拟 DOM 的基本单位。它并不是实际的 DOM 节点，而是对真实 DOM 的一种抽象表示）
  2、用于在 Vue 组件中自定义渲染逻辑。
  3、适合需要动态构建 DOM 结构或在运行时调整渲染内容的场景。
语法：
  import { h } from 'vue';
  参数：h(tagOrComponent, propsOrChildren, children?)
    tagOrComponent：DOM 标签名字符串，如 'div', 'span'。/ 组件引用，如 MyComponent。
    propsOrChildren（可选）：如果是对象：表示该节点的属性或事件。 / 如果是数组或字符串：表示子节点内容
    children（可选）：子节点，可以是字符串、数组或另一个 VNode。
适用场景：
  1、动态 UI 生成：需要根据复杂的条件动态生成内容。
  2、自定义组件渲染：组件的渲染逻辑与常规模板有显著不同。
  3、开发渲染插件或库：使用渲染函数为核心逻辑。
注意事项：
  1、类型支持：在 TypeScript 环境中，h 函数的参数和返回值类型已经由 @vue/runtime-core 定义。
  2、性能优化：由于完全动态的渲染，过多使用 h 函数可能降低可维护性。
  3、使用场景：一般来说，优先使用模板，除非确实需要动态的渲染逻辑。
ps:rander优先级低于template，故需要将template删除在进行渲染
-->
<script lang="ts">
import { h } from 'vue'
import dayStuDemo3 from '../day20241211/StuDemo3.vue'
export default {
  name: 'dayStuDemo4',
  setup() {
    // 定义一个自定义渲染函数
    const renderContent = () => {
      return h('div', { id: 'wrap' }, [
        h('h1', '组合式API-自定义渲染-返回函数'),
        h('p', '通过vue的h函数自定义渲染'),
        h('p', 'This content is rendered using a render function in setup()'),
        h('button', { onClick: () => alert('Button clicked!') }, '点我'),
        h(dayStuDemo3),
      ])
    }

    // 返回渲染函数作为自定义渲染的内容
    return {
      renderContent,
    }
  },
  // 自定义渲染函数
  render() {
    // 调用 setup() 中返回的渲染函数
    return this.renderContent()
  },
}
</script>

<style lang="scss"</style>
