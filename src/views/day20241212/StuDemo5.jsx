/*
!vite项目中安装指令
    npm/cnpm/pnpm install @vitejs/plugin-vue-jsx -D   //安装指令

!Vue CLI 中安装 JSX指令
    vue add jsx     //安装指令

!什么是 JSX 渲染模式:
    JSX 是一种 JavaScript 的语法扩展，允许开发者在 JavaScript 中编写类似 HTML 的代码，用于定义组件的结构和逻辑。在 Vue 3 中，JSX 是一种替代模板 (template) 的渲染方式，可以更灵活地控制组件的渲染逻辑。

!JSX 的特点:
    1、HTML 与 JavaScript 的融合
    2、灵活性更高：与传统模板相比，JSX 更适合动态、复杂的渲染逻辑，因为可以直接在渲染函数中使用 JavaScript 表达式、循环、条件等
    3、强大的开发体验：提供语法高亮、类型检查（配合 TypeScript）以及更自然的代码补全  /  易于理解复杂逻辑，不需要像模板中嵌套指令和绑定
    4、组件化开发的天然优势：JSX 提供类似 React 的组件化写法，便于开发者在 Vue 和 React 之间切换或复用思想
!HTML 与 JavaScript 的融合：JSX 的代码看起来像 HTML，但实际上是 JavaScript 的语法糖，会在编译时转换为 h() 函数调用，示例如下：
    !jsx.文件
    <div>Hello</div>
    !会被编译成
    h('div', {}, 'Hello');

!jsx原理：
    JSX 会编译为 h() 函数，因此与 Vue 模板的底层机制一致

!Vue 3 中使用 JSX 的场景:
    1、动态渲染逻辑复杂： 当渲染逻辑涉及很多条件、循环或动态内容时，JSX 比模板更清晰
    2、跨框架开发： 如果你对 React 的开发方式熟悉，使用 JSX 能提供一致的开发体验
    3、需要完全的逻辑控制： JSX 中可以直接使用 JavaScript 表达式，比模板更灵活。

!基本语法：
    1、JSX 标签可以嵌套和组合
      const App = () => (
        <div>
          <h1>Hello</h1>
          <p>Welcome to Vue JSX</p>
        </div>
      );
    2、属性的传递和绑定
      const App = () => <div class="container">Hello</div>;
    3、事件绑定
      const App = () => <button onClick={() => alert('Clicked!')}>Click Me</button>;
!支持 Vue 特性：
    1、v-model
      <input v-model={value} />
    2、插槽
      const App = () => (
        <MyComponent>
          <template v-slot:default>
            <p>Default slot content</p>
          </template>
        </MyComponent>
      );
!ps:
  1、Vue 的模板语言（template）和 <script> 标签本身并不直接支持 JSX。JSX 是 JavaScript 的扩展语法，Vue 并没有内置对其的解析
  2、<script lang="ts"> 是专门用来处理 TypeScript 的，而 JSX 的解析需要额外工具（如 @vitejs/plugin-vue-jsx）
*/
//!defineComponent 是 Vue 3 提供的一个帮助函数，用于定义和描述 Vue 组件的类型。它的主要作用是：增强类型推导（TypeScript 环境中尤为重要）
import { defineComponent, ref, computed } from 'vue'
import dayStuDemo3 from '../day20241211/StuDemo3.vue'
export default defineComponent({
  name: 'StuDemo5',
  //components 是 Vue 的选项，用于注册子组件
  components: {
    dayStuDemo3,
  },
  setup() {
    // 响应式数据
    const message = ref('组合式API-自定义渲染-JSX')
    const inputValue = ref('1111')
    // 计算属性
    const computedMessage = computed(() => {
      return `${message.value} (computed)`
    })
    // 方法
    const updateMessage = () => {
      message.value = 'Message updated!'
    }
    // JSX 渲染函数
    return () => (
      <div id="wrap">
        <h1>{message.value}</h1>
        <p>{computedMessage.value}</p>
        <button onClick={updateMessage}>Update Message</button>
        <br />
        <input v-model={inputValue.value} placeholder="Type something" />
        <p>Input Value: {inputValue.value}</p>
        <dayStuDemo3 />
      </div>
    )
  },
})
