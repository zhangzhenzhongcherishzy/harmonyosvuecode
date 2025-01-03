<template>
  <div class="route100">
    <h1>sd1的中嵌套路由的子组件 detail2{{ route.params }}</h1>
    <div>
      <p>$route.params.title: {{ $route.params.title }}</p>
      <p>props: {{ props.title }}{{ props.content }}</p>
      <p style="background-color: cornflowerblue">detail2明明视图:{{ props.id }}</p>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name:'srDetail2'
}
</script>
<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()

const props = defineProps({
  id: String,
  title: String,
  content: String
})

// 打印params参数
// 打印params参数
console.log(route.params, 'route.params')
console.log(route.query, 'route.params')
</script>

<style lang="scss" scoped>
.route100 {
  padding: 10px;
  box-sizing: border-box;
}
</style>
