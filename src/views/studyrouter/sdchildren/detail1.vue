<template>
  <div>
    <h1>sd1的中嵌套路由的子组件 detail1</h1>
    <p style="background-color: cornflowerblue">命名视图detail1:{{ props.id }}</p>
  </div>
</template>

<script lang="ts">
export default {
  name:'srDetail1'
}
</script>

<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()

const props = defineProps(['id'])
// 打印params参数
console.log(route.params, 'route.params')
console.log(route.query, 'route.params')
</script>

<style></style>
