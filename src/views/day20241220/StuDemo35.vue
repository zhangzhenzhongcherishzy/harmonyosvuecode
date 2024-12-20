<template>
  <div id="wrap">
    <h1>侦听器使用场景</h1>
    <p>{{ app }}</p>
    <input type="text" v-model="app" />

    <!-- 使用侦听器实现实时更新视图 -->
    <p ref="box"></p>
    <input type="text" v-model="data" />

    <!-- 触发count更新 -->
    <p>{{ count }}</p>
  </div>
</template>

<script lang="ts">
export default {
  name: 'dayStuDemo35',
};
</script>

<script lang="ts" setup>
import { onMounted, ref, watchEffect } from 'vue';
const app = ref('hello world');

//使用侦听器实现实时更新视图
const data = ref('你的问题我现在还没有学会,请过两天再问问我,这几天我正在疯狂的吃数据!');
const box = ref<HTMLElement | null>(null);
onMounted(() => {
  watchEffect(() => {
    if (box.value) {
      box.value.textContent = data.value;
    }
  });
});

//需要管理副作用
const count = ref(0);
const stop = watchEffect((funs) => {
  console.log(count.value);
  const time = setInterval(() => {
    count.value++;
  }, 2000);

  //清除副作用
  funs(() => {
    clearInterval(time);
  });
});

stop();
</script>

<style lang="scss"></style>
