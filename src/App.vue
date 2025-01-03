<script setup lang="ts">
import { RouterView } from 'vue-router'

// 导航路由的遍历渲染，无用，可以忽略
// import { ref } from 'vue';
// import { routerList } from '@/router/index'
// const routeList = ref<any>(routerList)
</script>
<template>
  <!-- 导航路由的遍历渲染，无用，可以忽略 -->
  <!-- <nav> -->
  <!-- <RouterLink v-for="item in routeList" :key="item.name" :to="{ path: item.path }">{{item.title || item.name}}</RouterLink> -->
  <!-- </nav> -->
  <!-- <hr /> -->
  <RouterView />
</template>

<style lang="scss"></style>
