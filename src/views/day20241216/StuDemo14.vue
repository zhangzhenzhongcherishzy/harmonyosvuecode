<template>
  <div id='wrap'>
    <h1>绑定内联样式 Style</h1>
    <!-- 绑定 HTML style:绑定对象 -->
    <p :style="{ fontSize: `${fontSize}px`, color: fontColor }" @click="changeFontColor">
      沁园春·雪
    </p>
    <hr>

    <!-- 绑定 HTML style: 直接绑定对象 -->
    <div :style="styleObject">沁园春·雪</div>
    <hr>

    <!-- 绑定 HTML style: 绑定数组 -->
    <div :style="[styleObject, styleObject2]">沁园春·雪</div>
  </div>
</template>

<script lang='ts'>
export default {
  name: 'dayStuDemo14',
}
</script>

<script lang='ts' setup>
import { ref, reactive } from 'vue';
const fontColor = ref('#abcdef')
const fontSize = ref(16)

const styleObject = reactive({
  color: 'red',
  fontSize: '30px'
})

const styleObject2 = reactive({
  backgroundColor: 'green'
})

const changeFontColor = () => {
  fontColor.value = '#000'
  setTimeout(() => {
    fontSize.value = 24
  }, 1000)
}
</script>

<style lang='scss'>
.active {
  color: darkorange;
}

.text-danger {
  background-color: red;
}

.text-success {
  background-color: green;
}

.active-new {
  font-size: 22px;
}
</style>
