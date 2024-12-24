<template>
  <div>
    <h3>{{ mySonMsg }}</h3>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  msg: String
})

const mySonMsg = ref(props.msg)
</script>

<style></style>
