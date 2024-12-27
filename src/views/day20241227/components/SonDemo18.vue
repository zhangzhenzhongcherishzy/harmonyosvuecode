<template>
  <div>
    <p>绑定的值(props):{{ props.mVal }}</p>
    <button type="button" @click="editmValProps">修改props的值</button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['mVal'])
const emit = defineEmits(['update:mVal'])

const editmValProps = () => {
  // 在子组件无法直接修改Props传过来的值，
  // props.mVal = 2222 // 无法为“mVal”赋值，因为它是只读属性。

  // 但是我可以把需要修改的值，使用emit时间穿回父组件，在父组件中实现修改
  emit('update:mVal', 2222)
}
</script>

<style></style>
