<template>
  <div id="wrap">
    <h1>路由元信息子组件</h1>
    <p>{{ route.params }}</p>
    <p>params标题: {{ $route.params.title }}</p>
    <p>props的id：{{ props.id }}</p>
    <p>props标题： {{ props.title }}</p>
    <p>props内容：{{ props.content }}</p>

  </div>
</template>

<script lang="ts">
export default {
  name: 'StuDemo55Son1',
}
</script>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
const route = useRoute()
// 打印params参数
console.log(route.params, 'route.params')

const props = defineProps({
  id: String,
  title: String,
  content: String,
})
</script>

<style lang="scss"></style>
