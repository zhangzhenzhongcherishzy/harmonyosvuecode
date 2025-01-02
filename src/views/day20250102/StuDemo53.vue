<template>
  <div id="wrap">
    <h1>嵌套路由(子路由)</h1>
    <!-- <router-link :to="{ name: 'StuDemo53Son', params: { id: '1' } }">User 1</router-link>
    <router-link :to="{ name: 'StuDemo53Son', params: { id: '2' } }">User 2</router-link>
    <router-link :to="{ name: 'StuDemo53Son', params: { id: '3' } }">User 3</router-link>
    <RouterView /> -->
    返回
    <input type="text" placeholder="请输入你要搜索的内容..." />
    <RouterLink to="/StuDemo53/StuDemo53Son2">搜索</RouterLink>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
export default {
  name: 'dayStuDemo53',
}
</script>
<script lang="ts"></script>
