<template>
  <div>
    <header v-if="$slots.header">
      <slot name="header" :msg :title="tle"> header</slot>
    </header>
    <main>
      <slot :msg> main</slot>
    </main>
    <footer>
      <slot name="footer"> footer </slot>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const msg = ref('子组件的msg')
const tle = ref('子组件的标题')
</script>

<style lang="scss" scoped>
header {
  background-color: goldenrod;
}
</style>
