<template>
  <div>
    <p>子组件绑定的值：{{ mVal }}</p>
    <input type="text" v-model="mVal" />
  </div>
</template>

<script setup lang="ts">
const mVal = defineModel()
</script>

<style></style>
