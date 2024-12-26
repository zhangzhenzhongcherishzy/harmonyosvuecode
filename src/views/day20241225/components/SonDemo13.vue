<template>
  <div>
    <!-- 基础插槽-->
    <!-- <slot></slot> -->

    <!-- 具名插槽（Named Slots） -->
    <header>
      <slot name="header"></slot>
    </header>
    <footer>
      <slot name="footer"></slot>
    </footer>

    <!-- 作用域插槽（Scoped Slots） -->
    <slot :message="'Hello from child'"></slot>

    <!-- 动态插槽名称 -->
    <slot :name="slotName"></slot>

    <!-- 插槽可以设置默认内容 -->
    <slot name="abc">默认内容</slot>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// 动态插槽名称：定义响应式数据
const  slotName = ref('dynamicSlotName')
</script>
