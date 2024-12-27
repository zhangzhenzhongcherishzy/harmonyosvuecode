<template>
  <div>
    <p>子组件绑定的值：{{ props.mVal }}</p>
    <p>子组件绑定的值：{{ props.mVal2 }}</p>
    <!-- <input type="text" v-model="props.mVal" /> -->

    <input
      type="text"
      :value="props.mVal"
      @input="(event) => {emit('update:mVal', (event.target as HTMLInputElement).value)}"
    />

    <input
      type="text"
      :value="props.mVal2" @input="(event) => {emit('update:mVal2', (event.target as HTMLInputElement).value)}"
    />
    <hr />
    <input type="text" v-model="userFrom.name" />
    <input type="text" v-model="userFrom.sex" />
    <input type="text" v-model="userFrom.age" />
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'

const props = defineProps(['mVal', 'mVal2', 'userInfo'])

const emit = defineEmits(['update:mVal', 'update:mVal2', 'update:userInfo'])

const userFrom = reactive(props.userInfo)

watch(userFrom, () => {
  console.log(userFrom)
  emit('update:userInfo', userFrom)
})
</script>

<style></style>
