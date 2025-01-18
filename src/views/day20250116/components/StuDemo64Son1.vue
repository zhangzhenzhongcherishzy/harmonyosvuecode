<template>
  <div>
    <div @click="$emit('close', props.itemID)">关闭{{ props.itemID }}</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  itemID: number
}>()

defineEmits(['close'])
</script>

<style></style>
