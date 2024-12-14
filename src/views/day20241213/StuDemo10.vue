<template>
  <div id="wrap">
    <h1>内置指令</h1>
    <!-- v-if  === 相当于是条件渲染 -->
    <p class="pnav" v-if="isShowP">
      当v-if元素被触发，元素及其所包含的指令/组件都会销毁和重构。如果初始条件是假，那么其内部的内容根本都不会被渲染。
      场景：需要重新出发dom树渲染的时候
    </p>
    <!-- v-show === ccs中 display:none   display:block; -->
    <p class="pmain" v-show="isShowP">
      v-show通过设置内联样式的 display CSS
      属性来工作，当元素可见时将使用初始display值;当条件改变时,也会触发过渡效果。
    </p>
    <button type="button" @click="() => (isShowP = !isShowP)">控制显示与隐藏</button>
    <hr />

    <!-- todo  v-if v-else-if  v-else -->
    <p @click="shiNum = 2" v-if="shiNum == 1">独立寒秋，湘江北去，橘子洲头。</p>
    <p @click="shiNum = 1" v-else>看万山红遍，层林尽染；漫江碧透，百舸争流。</p>
    <p>鹰击长空，鱼翔浅底，万类霜天竞自由。怅寥廓，问苍茫大地，谁主沉浮？</p>
    <hr />
    <!-- *v-if === if(){...}  v-else-if === else if(){...}   v-else === else{....} -->
    <p v-if="shiNum == 1">床前明月光</p>
    <p v-else-if="shiNum == 2">疑是地上霜</p>
    <p v-else-if="shiNum == 3">举头望明月</p>
    <p v-else>低头思故乡</p>
    <button @click="shiNum = 1">shiNum：1</button>
    <button @click="shiNum = 2">shiNum：2</button>
    <button @click="shiNum = 3">shiNum：3</button>
    <button @click="shiNum = 4">shiNum：else</button>
    <hr />
    <!-- *v-for  === 原生js中for循环  在这里用法，有点类似于 forEach-->
    <!-- v-for遍历字符串 -->
    <ul>
      <li v-for="item in `abcdefg`" :key="item">{{ item }}</li>
    </ul>
    <hr />
    <!-- v-for遍历数字 -->
    <ul>
      <li v-for="item in 10" :key="item">{{ item }}</li>
    </ul>
    <hr />
    <!-- v-for遍历数据 -->
    <ul>
      <li v-for="(item, index) in NightlyThoughtsArr" :key="index">
        {{ `item:${item}---index:${index}` }}
      </li>
    </ul>
    <hr />
    <!-- v-for遍历对象 -->
    <ul>
      <li v-for="(item, key) in NightlyThoughts" :key="key">
        {{ `item:${item}---key:${key}` }}
      </li>
    </ul>
    <hr />
    <!-- v-for遍历对象 添加index，查看 -->
    <ul>
      <li v-for="(item, key, index) in NightlyThoughts" :key="item">
        {{ `item:${item}---key:${key}---index:${index}` }}
      </li>
    </ul>
    <hr />
    <!-- v-for 遍历mySet -->
    <ul>
      <li v-for="(item, key) in mySet" :key="key">
        {{ item }}
      </li>
    </ul>
    <hr />
    <!-- v-for 遍历myMap -->
    <ul>
      <li v-for="(item, key) in myMap" :key="key">
        {{ `${item}----${item[0]}----${item[1]}` }}
      </li>
    </ul>

    <!-- v-model：数据双向绑定 -->
    <!-- ?inputVal是状态变量，只要inputVal被修改，就会渲染这部分ui的更新 -->
    <p>{{ inputVal }}</p>
    <input type="text" v-model="inputVal" />
    <button @click="inputVal = '修改后的inputVal'">修改InputValue</button>
  </div>
</template>

<script lang="ts">
export default {
  name: 'dayStuDemo10',
}
</script>

<script lang="ts" setup>
import { ref } from 'vue'
const isShowP = ref(true)
const shiNum = ref(1)

//v-for遍历数组对象的形式
const NightlyThoughtsArr = ['床前', '明月光', '疑是', '地上霜']
const NightlyThoughts = { a: '床前', b: '明月光', c: '疑是', d: '地上霜' }
//自定义的一个
const mySet = new Set()
mySet.add('apple')
mySet.add('banana')
mySet.add('orange')
mySet.add('apple')

const myMap = new Map()
myMap.set('apple', 2)
myMap.set('banana', 3)
myMap.set('orange', 5)
myMap.set('apple', 6)
console.log(myMap)

//数据双向绑定
const inputVal = ref('default')
</script>

<style lang="scss">
@use '@/assets/common.scss';
</style>
