<!--
状态持久化：
  1、场景： 使用状态持久化插件可以在页面刷新或重启应用时保留 Store 数据。
  2、安装插件：npm install pinia-plugin-persistedstate
  3、配置插件
    // main.ts
    import { createPinia } from 'pinia';
    import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

    const pinia = createPinia();
    pinia.use(piniaPluginPersistedstate);

    // 挂载到 Vue 实例
    import { createApp } from 'vue';
    import App from './App.vue';

    const app = createApp(App);
    app.use(pinia);
    app.mount('#app');
-->
<template>
  <div id="wrap">
    <h1>Pinia进阶</h1>
  </div>
</template>

<script lang="ts">
export default {
  name: 'dayStuDemo57',
}
</script>

<script lang="ts" setup>
import { createPinia } from 'pinia';
import { useStoreone } from '@/stores/counter' // 只作为示例，实际动态注册可以使用 import()

const pinia = createPinia();

// 假设动态导入 Store 模块
const loadExampleStore = async () => {
  const { useStoreone } = await import('@/stores/counter');
  const exampleStore = useStoreone();
  return exampleStore;
};

// 在需要时动态加载
loadExampleStore().then((store) => {
  store.increment();
  console.log(store.count); // 输出 1
});

</script>

<style lang="scss"></style>
