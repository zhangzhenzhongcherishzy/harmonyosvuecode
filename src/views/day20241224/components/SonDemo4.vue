<script lang="ts">
import { h } from 'vue' // 引入 h 函数来创建 VNode

export default {
  props: {
    msg: String
  },
  setup(props) {
    // 定义一个自定义渲染函数
    const renderContent = () => {
      return h('div', [
        h('h1', '通过vue的h函数自定义渲染:' + props.msg),
        h('p', 'This content is rendered using a render function in setup()'),
        h('button', { onClick: () => alert('Button clicked!') }, '点我')
      ])
    }

    // 返回渲染函数作为自定义渲染的内容
    return {
      renderContent
    }
  },

  // 自定义渲染函数
  render() {
    // 调用 setup() 中返回的渲染函数
    return this.renderContent()
  }
}
</script>

<style scoped>
/* Your styles here */
</style>
