<template>
  <div>
    <template v-if="props.isZhendao === 1"> 不要再堕落了~！ </template>
    <template v-if="props.isZhendao === 2"> 不要振刀 </template>
    <template v-if="props.isZhendao === 3"> 我就要振刀 </template>
    <template v-if="props.isZhendao === 4"> 我要修大坝 </template>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  isZhendao: number
}>()
</script>
