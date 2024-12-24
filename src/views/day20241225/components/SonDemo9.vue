<template>
  <div id="wrap">
    <div>
      姓名:{{ myUser.name }}----性别:{{ myUser.sex }}----age:{{ myUser.age }}
    </div>
    <button type="button" @click="editUserInfo">修改用户的值</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

export interface Iuser {
  id?: number
  name: string
  sex: string
  age: number
}
// 响应式 Props 解构 3.5
const { user } = defineProps<{
  user: Iuser
}>()

const myUser = ref(user)

const editUserInfo = () => {
  myUser.value.age = 20
}
</script>

<style></style>
