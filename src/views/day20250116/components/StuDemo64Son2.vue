<template>
  <template v-for="item in imgArr2" :key="item.id">
    <slot :item="item">
      <div @click="closeHander(item)">关闭 {{ item }}</div>
    </slot>
  </template>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  imgArr: { id: number; imgSrc: string }[] | undefined
}>()

const imgArr2 = ref(props.imgArr)

watch(
  () => props.imgArr,
  () => {
    imgArr2.value = props.imgArr
  }
)

const closeHander = (item: { id: number; imgSrc: string }) => {
  imgArr2.value = imgArr2.value?.filter((i) => i.id !== item.id)
}
</script>

<style></style>
