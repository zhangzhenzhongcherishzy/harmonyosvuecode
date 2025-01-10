<!--
emelent-plus:
!完全导入
1、操作指令：npm/cnpm/pnpm install element-plus --save    ||    yarn add element-plus
2、配置main.ts
  ?导入element-plus
  import ElementPlus from 'element-plus'
  import 'element-plus/dist/index.css'
  ?使用element-plus
  app.use(ElementPlus)
!按需导入
1、操作指令：npm/cnpm/pnpm install -D unplugin-vue-components unplugin-auto-import
2、配置vite.config.ts
  ?element-plus  按需导入配置
  import AutoImport from 'unplugin-auto-import/vite'
  import Components from 'unplugin-vue-components/vite'
  import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
!图标的使用
1、操作指令：npm/cnpm/pnpm install @element-plus/icons-vue   ||    yarn add @element-plus/icons-vue
   声明文件：npm/cnpm/pnpm install @types/element-plus       ||    yarn add @types/element-plus
2、配置main.ts
  ?导入element-plus  icon
  import * as ElementPlusIconsVue from '@element-plus/icons-vue'
  ?使用element-plus  icon
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
-->
<template>
  <div id="wrap">
    <h1>element-plus安装分类</h1>
    <!-- 完全导入使用 -->
    <!-- 按钮 -->
    <el-row class="mb-4">
      <el-button>Default</el-button>
      <el-button type="primary">Primary</el-button>
      <el-button type="success">Success</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
      <el-button type="danger">Danger</el-button>
    </el-row>
    <!-- 开关 -->
    <el-switch v-model="value1" />
    <el-switch
      v-model="value2"
      class="ml-2"
      style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
    />
    <!-- 图标 -->
    <el-icon :size="50" color="blue"><Search /></el-icon>
  </div>
</template>

<script lang="ts">
export default {
  name: 'dayStuDemo62',
}
</script>

<script lang="ts" setup>
import { ref } from 'vue'
//开关
const value1 = ref(true)
const value2 = ref(true)
</script>

<style lang="scss" scoped></style>
