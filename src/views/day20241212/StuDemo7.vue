<template>
  <div id="wrap">
    <h1>setup 语法糖支持ts写法</h1>
    <div class="par">
      <p>{{ str }}</p>
      <p>{{ str2 }}</p>
      <button type="button" @click="changeStr">修改str</button>
      <p>{{ userInfo.age }}</p>
      <p>{{ userInfo2.username }}</p>
    </div>
    <hr />
    <DeepDemo class="comson2000" />
  </div>
</template>
<script lang="ts">
export default {
  name: 'dayStuDemo7',
}
</script>
<script lang="ts" setup>
import { ref, type Ref } from 'vue'
import DeepDemo from './components/DeepDemo.vue'

// setup中访问this是undefined。
// console.log(this) // undefined

interface IUser {
  username: string
  sex: string
  age: number
}

// 普通变量
let str: string = '我是组合式api的普遍变量'

// 响应式变量
const str2 = ref<string>('我是响应式变量')

const userInfo: Ref<IUser> = ref({
  username: 'changsheng',
  age: 22,
  sex: 'nan',
})

const userInfo2 = ref<IUser>({
  username: 'changsheng',
  age: 22,
  sex: 'nan',
})

const changeStr = () => {
  console.log('changeStr')
  str = '我不能响应式显示UI的效果，修改我没用'
  console.log(str)
  str2.value = '我是响应变量，我可以出发UI的更新'

  fun1()
}

const fun1 = () => {
  console.log('fun1')
}
</script>
<style lang="scss">
@use '@/assets/common.scss' as *;
</style>
