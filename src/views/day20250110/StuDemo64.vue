<template>
  <div class="common-layout" :class="{ dark: isDark }">
    <el-container>
      <!-- 切换主题按钮 -->
      <el-header>
        <el-button type="primary" @click="toggleDarkMode">切换暗黑模式</el-button>
      </el-header>
      <el-container>
        <!-- 侧边菜单栏 -->
        <el-aside width="200px">
          <!-- 侧边滚动条 -->
          <el-scrollbar>
            <!-- 侧边菜单栏 -->
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
            >
              <!-- 使用路由渲染模拟菜单栏 -->
              <template v-for="item in routerLists">
                <!-- 没有子路由的菜单栏显示情况 -->
                <template v-if="!item.children">
                  <el-menu-item :index="item.path" :key="item.name">
                    <el-icon><setting /></el-icon>
                    <template #title>{{ item!.meta?.title || item.name }}</template>
                  </el-menu-item>
                </template>
                <!-- 有子菜单栏的显示情况 -->
                <template v-else>
                  <el-sub-menu :index="item.path" :key="item.name">
                    <template #title>
                      <el-icon><setting /></el-icon>
                      {{ item!.meta?.title || item.name }}
                    </template>

                    <el-menu-item
                      :index="item.path + '/' + sonItem.path"
                      v-for="sonItem in item.children"
                      :key="sonItem.name"
                    >
                      {{ sonItem!.meta?.title || sonItem.name }}
                    </el-menu-item>
                  </el-sub-menu>
                </template>
              </template>
            </el-menu>
          </el-scrollbar>
        </el-aside>
        <!-- 主题main部分和页脚部分 -->
        <el-container>
          <el-main :class="{ dark0: isDark }">Main</el-main>
          <el-footer :class="{ dark0: isDark }">Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
export default {
  name: 'dayStuDemo64',
};
</script>

<script lang="ts" setup>
import { ref } from 'vue';
//组合式函数库
import { useDark } from '@vueuse/core';
//侧边菜单栏
import { Document, Menu as IconMenu, Location, Setting } from '@element-plus/icons-vue';
import { routerList } from '@/router/index';
//切换主题
const isDark = useDark(); // 是否处于暗模式
const toggleDarkMode = () => {
  isDark.value = !isDark.value;
};
//侧边菜单栏
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const routerLists = ref<any[]>(routerList);
</script>

<style lang="scss" scoped>
.common-layout {
  width: 100%;
  height: 100%;
}
.el-container {
  height: 100%;
}
.el-header {
  padding: 0.25rem;
  background-color: rgba($color: #1f2d3d, $alpha: 0.8);
}
.el-aside,
.el-menu {
  background-color: rgba($color: #304156, $alpha: 0.8);
}
.el-menu-item {
  color: white;
  width: 100%;
}
.el-scrollbar {
  height: calc(100vh - 60px);
}
.el-main {
  padding: 10px;
  height: calc(100vh - 120px);
  background-color: rgba($color: #f0ffff, $alpha: 0.8);
}
.el-footer {
  padding: 0 10px;
  display: grid;
  place-items: center;
  background-color: rgba($color: #f0ffff, $alpha: 0.8);
}
.dark {
  background-color: rgba($color: #1f2d3d, $alpha: 0.6);
  color: white;
}
.dark0 {
  background-color: rgba($color: #1f2d3d, $alpha: 0.7);
  color: white;
}
</style>
