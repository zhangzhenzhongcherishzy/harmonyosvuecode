<!--
!路由元信息（Route Meta Fields）：
  是 Vue Router 提供的一种机制，用来在路由配置中存储额外的数据。这些数据通常用于控制页面行为、导航守卫、权限检查等功能。路由元信息存储在路由配置的 meta 属性中，并且可以在路由导航守卫、组件中轻松访问
!路由元信息的特点
  1、自定义字段：可以存储任何你需要的数据，比如权限要求、页面标题、动画效果等。
  2、可选：路由配置中的 meta 属性是可选的。
  3、继承性：嵌套路由中，子路由可以继承父路由的 meta 信息。
!常见用途:
  1、页面标题动态设置
    document.title = to.meta.title || '默认标题';
  2、权限控制：
    if (to.meta.requiresAuth && !isAuthenticated) {
      next({ name: 'LoginView' });
    }
  3、动画效果：
    const transitionName = to.meta.transition || 'fade';
  4、面包屑导航：
    const breadcrumbs = to.meta.breadcrumbs || [];
-->
<template>
  <div id="wrap">
    <h1>路由元信息</h1>
    <p>{{ pageTitle }}</p>
    <RouterLink :to="{ name: 'StuDemo55Son1', params: { id: '10000', title: '新闻标题', content: '内容' } }">元信息子组件1</RouterLink>
    <RouterView>
      <template #default="{ Component, route }">
        <transition name="bounce">
          <component :is="Component" :key="route.path"/>
        </transition>
      </template>
    </RouterView>
  </div>
</template>

<script lang="ts">
export default {
  name: 'dayStuDemo55',
}
</script>

<script lang="ts" setup>
import { useRoute } from 'vue-router'

const route = useRoute()
// 获取元信息中的页面标题
const pageTitle = route.meta.title || '默认标题'
</script>

<style lang="scss">
/*
  进入和离开动画可以使用不同
  持续时间和速度曲线。
  使用：name="slide-fade"
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

//第二种动画 使用：name="bounce"
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
