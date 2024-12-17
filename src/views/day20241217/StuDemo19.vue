<template>
  <div id="wrap">
    <h1>Reactive包装注意事项补充</h1>
    <button @click="changeUser" type="button">改变user的值,看看是否会丢失响应式</button>
    <ul>
      <li>user: {{ user.age }}-{{ user.name }}-{{ user.sex }}</li>
      <li v-for="item in user.aihao" :key="item">{{ item }}</li>
    </ul>
    <hr />

    <!-- 建构完之后变成未包装的变量 -->
    <button @click="changeUserJie" type="button">改变user结构后的值,看看是否会丢失响应式</button>
    <ul>
      <li>name:{{ name }}</li>
      <li>age:{{ age }}</li>
      <li>sex:{{ sex }}</li>
      <li v-for="item in aihao" :key="item">{{ item }}</li>
    </ul>
    <ul>
      <li v-for="item in shenAihao" :key="item">{{ item }}</li>
    </ul>
    <ul>
      <li v-for="item in reactShenAihao" :key="item">{{ item }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  name: 'dayStuDemo19',
}
</script>

<script lang="ts" setup>
import { reactive } from 'vue'
//对解构操作不友好：当我们将响应式对象的`原始类型`属性解构为本地变量时，将丢失响应性连接,应用类型保留响应式
const user = reactive({
  name: '张国荣',
  sex: 'man',
  age: 18,
  aihao: ['唱', '跳', 'rap', '篮球'],
})
const changeUser = () => {
  user.age = 88
  user.aihao.push('你干嘛')
}
// 建构完之后变成未包装的变量
// 深copy aihao
const { name, sex, age, aihao } = user
const shenAihao = JSON.parse(JSON.stringify(aihao))
const reactShenAihao = reactive(JSON.parse(JSON.stringify(aihao)))
const changeUserJie = () => {

  // 原始类型丢失响应式
  // name = '周杰伦'

  // 引用类型不会丢失响应性，但是引用的还是原来的地址，会干扰结构之前的对象属性
  // aihao.push('什么的爱好')
  // console.log(aihao)

  // 深copy不会改变响应式状态
  shenAihao.push('什么爱好')
  console.log(shenAihao)

  // 深copy并且从新包装的对象
  // reactShenAihao.push('什爱好')
  // console.log(reactShenAihao)
}
</script>

<style lang="scss"></style>
