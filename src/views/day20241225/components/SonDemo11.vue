<template>
  <div>
    <button type="button" @click="editTitle">
      emit触发父组件绑定子组件上的函数2(修改title的值)
    </button>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits({
  submit(payload: { email: string; password: string }) {
    // 通过返回值为 `true` 还是为 `false` 来判断 验证是否通过
    if (payload.email === payload.password) {
      return true
    }
    return false
  }
})
const editTitle = () => {
  emit('submit', { email: '22', password: '22' })
}
</script>
