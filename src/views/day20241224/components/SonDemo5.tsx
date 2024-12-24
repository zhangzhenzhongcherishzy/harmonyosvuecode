// MyComponent.jsx
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  props: ['msg'],
  setup(props) {
    // 响应式数据
    const message = ref('欢迎使用 JSX 语法自定义渲染模板' + props.msg)
    const inputValue = ref('')

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
      <div>
        <h1>{message.value}</h1>
        <p>{computedMessage.value}</p>
        <button onClick={updateMessage}>Update Message</button>
        <input v-model={inputValue.value} placeholder="Type something" />
        <p>Input Value: {inputValue.value}</p>
      </div>
    )
  }
})
