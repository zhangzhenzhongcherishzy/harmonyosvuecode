<template>
  <div id="wrap">
    <h1>动态路由</h1>
    <router-link :to="{ name: 'StuDemo54Son1', params: { id: '1' } }">User 1</router-link>
    <router-link :to="{ name: 'StuDemo54Son1', params: { id: '2' } }">User 2</router-link>
    <router-link :to="{ name: 'StuDemo54Son1', params: { id: '3' } }">User 3</router-link>
    <RouterView />
  </div>
</template>

<script lang="ts">
export default {
  name: 'dayStuDemo54',
}
</script>
<script lang="ts" setup>
import { useRoute } from 'vue-router'
const route = useRoute()
// 打印params参数
// 打印params参数
console.log(route.params, 'route.params')
console.log(route.query, 'route.params')
</script>
