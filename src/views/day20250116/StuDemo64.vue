<template>
  <div id="wrap">
    <h1>组件插槽传值复习</h1>
    <img width="300" src="/src/assets/images/6.png" />

    <GG v-for="item in imgArr" :item-i-d="item.id" @close="closeHandler" :key="item.id"></GG>

    <hr />
    <GG2 :img-arr="imgArr"></GG2>

    <hr />
    <GG3 ref="gg3Ref" v-slot="{ item }">
      <div @click="gg3Ref2?.delItem(item)">关闭哈哈哈哈{{ item.id }}</div>
    </GG3>
  </div>
</template>

<script lang="ts">
export default {
  name: 'dayStuDemo64',
}
</script>

<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue'
import GG from './components/StuDemo64Son1.vue'
import GG2 from './components/StuDemo64Son2.vue'
import GG3 from './components/StuDemo64Son3.vue'

const imgArr = ref<{ id: number; imgSrc: string }[]>()
const closeHandler = (id: number) => {
  console.log(id, '#id')
  /*
  1、(i) => i.id !== id 是一个回调函数，表示保留数组中所有 id 不等于指定值 id 的元素
    1-1、示例：
      const id = 2
      imgArr.value = imgArr.value?.filter((i) => i.id !== id)
    1-2、代码解释：
        1-2-1、filter 遍历数组，检查每个元素：
        1-2-2、如果 i.id === 2，该元素会被移除；
        1-2-3、其他元素保留。
  2、?. 是 JavaScript 的可选链操作符，确保在访问属性或调用方法前，检查目标是否为 null 或 undefined。
  3、如果 imgArr.value 为 null 或 undefined，整条语句会短路，filter 不会被调用，避免抛出错误
  */
  imgArr.value = imgArr.value?.filter((i) => i.id !== id)
}



const gg3Ref2 = useTemplateRef('gg3Ref')
onMounted(() => {
  // GG1：循环传入item  和GG2：传入数组内部循环
  imgArr.value = [
    {
      id: 134,
      imgSrc: 'a.png',
    },
    {
      id: 23423,
      imgSrc: 'a.png',
    },
    {
      id: 234234,
      imgSrc: 'a.png',
    },
  ]

  gg3Ref2.value?.setData([
    {
      id: 134,
      imgSrc: 'a.png',
    },
    {
      id: 23423,
      imgSrc: 'a.png',
    },
    {
      id: 234234,
      imgSrc: 'a.png',
    },
  ])
})
</script>

<style></style>
