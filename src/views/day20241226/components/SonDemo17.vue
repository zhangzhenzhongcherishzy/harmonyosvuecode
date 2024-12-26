<template>
  <div class="group2">
    <h2>数据列表</h2>
    <!-- !渲染父组件传递过来的请求数据slist -->
    <div class="grid-box">
      <template v-for="item in props.slist" :key="item.id">
        <!-- 利用渲染作用域:插槽内容可以访问到父组件的数据作用域，因为插槽内容本身是在父组件模板中定义的，把item传递到父组件中使用 -->
        <slot name="gridBoxItem" v-bind="item"> </slot>
      </template>
    </div>
    <hr />

    <!-- !渲染父组件传递过来的chide响应式变量 -->
    <p>爷爷给的吃的：{{ props.chide }}</p>
    <hr />

    <!-- !渲染孙组件SonSonDemo1 -->
    <div>
      <SonSonDemo1 :chide2="props.chide"></SonSonDemo1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type IDemo5List } from '@/service/types/StuDemo43Types'
import { watchEffect } from 'vue'
import SonSonDemo1 from './SonSonDemo1.vue'

//接受的父组件传值过来的slist 和 chide
const props = defineProps<{
  slist: IDemo5List[]
  chide: string
}>()
//监听请求的数据变化可以看到请求过程
watchEffect(() => {
  console.log(props.slist)
})
</script>

<style lang="scss" scoped>
.group2 {
  border: 2px solid rgb(111, 203, 50);
  margin: 10px;
  padding: 10px;
}

/* #region  网格布局 */

.grid-box {
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
}

.grid-box-item {
  border-radius: 5px;
  cursor: pointer;
}
</style>
