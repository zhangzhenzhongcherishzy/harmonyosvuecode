<template>
  <div>
    <h1>嵌套路由</h1>

    <div>
      <router-link
        :to="{
          //name:'xiang1', //用name也可以跳转
          path: '/srdemo1/detail1',
          query: {
            id: 1,
            title: '新闻标题',
            content: '内容',
          },
        }"
      >
        query 传参
      </router-link>

      <router-link
        replace
        :to="{
          name: 'xiang2',
          params: {
            title: '新闻标题',
            content: '内容',
          },
        }"
      >
        params 传参:replace
      </router-link>

      <router-link
        :to="{
          name: 'defaultp',
          params: {
            id: '10000',
          },
        }"
      >
        default: params 传参
      </router-link>
      <router-view>
        <template #default="{ Component, route }">
          <transition enter-active-class="animate__animated animate__backInRight" mode="out-in">
            <component :is="Component" :key="route.path" />
          </transition>
        </template>
      </router-view>

      <!-- 默认视图 -->
      <router-view name="sidebar" />
      <!-- 命名视图 -->

      <hr />
      <div>
        <button type="button" @click="rPush">router.push跳转</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'srDemo1',
}
</script>
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const route = useRoute() //路由上下文：能获取路由参数
const router = useRouter() // 路由对象：调用对象的方法

console.log(route.query)
console.log(route.params)

// console.log(router.push)
// console.log(router.replace)
const isLogin = true
const rPush = () => {
  if (isLogin) {
    router.push({
      name: 'xiang1',
      query: {
        id: 1,
        title: '新闻标题',
        content: '内容',
      },
    })
  } else {
    router.replace({
      name: 'xiang1',
      query: {
        id: 1,
        title: '新闻标题',
        content: '内容',
      },
    })
  }
}
</script>

<style lang="scss" scoped>
/*
  进入和离开动画可以使用不同
  持续时间和速度曲线。
*/
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
