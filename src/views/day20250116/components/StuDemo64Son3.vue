<template>
  <template v-for="item in imgArr2" :key="item.id">
    <slot :item="item">
      <div @click="closeHander(item)">GG3关闭 {{ item }}</div>
    </slot>
  </template>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const imgArr2 = ref<{ id: number; imgSrc: string }[]>()

/**
 * 设置数据
 * @param dataArr
 */
const setData = (dataArr: { id: number; imgSrc: string }[]) => {
  imgArr2.value = dataArr
}

const delItem = (item: { id: number; imgSrc: string }) => {
  imgArr2.value = imgArr2.value?.filter((i) => i.id !== item.id)
}

const closeHander = (item: { id: number; imgSrc: string }) => {
  imgArr2.value = imgArr2.value?.filter((i) => i.id !== item.id)
}

defineExpose({
  setData,
  delItem
})
</script>

<style></style>
