<template>
  <div id='wrap'>
    <h1>绑定 HTML class</h1>
    <!--绑定 HTML class:绑定对象  使用对象语法来动态绑定多个类名  -->
    <p :class="{ active: isActive, 'text-danger': hasError }" @click="changeClass">
      沁园春·雪
    </p>
    <hr>

    <!-- 绑定 HTML class:绑定对象变量 reactive -->
    <p :class="classObj" @click="changeClass2">沁园春·雪</p>
    <hr>

    <!-- 绑定 HTML class:绑定对象变量 ref -->
    <p :class="classObjRef" @click="changeClass3">沁园春·雪</p>
    <hr>

    <!-- 绑定 HTML class:绑定数组 ref -->
    <p :class="[isActive ? activeClass2 : '', errorClass2, `active-new`]" @click="changeClass4">
      沁园春·雪
    </p>
    <hr>

    <!-- 绑定 HTML class: 在组件中使用 -->
    <p>
      <StuDemoSon4 :class="classObj"></StuDemoSon4>
    </p>
    <hr>

    <!-- 绑定 HTML class: 计算属性 -->
    <p :class="classObjComp" @click="changeClass4">沁园春·雪</p>
  </div>
</template>

<script lang='ts'>
export default {
  name: 'dayStuDemo13',
}
</script>

<script lang='ts' setup>
import { computed, reactive, ref } from 'vue';
import StuDemoSon4 from './components/StuDemoSon4.vue'
//绑定 HTML class:绑定对象  使用对象语法来动态绑定多个类名
const isActive = ref(false)
const hasError = ref(false)
function changeClass() {
  isActive.value = !isActive.value
  hasError.value = !hasError.value
}
// 绑定 HTML class:绑定对象变量 reactive
const classObj = reactive({  //通过 reactive 包装的 状态对象
  active: true,
  'text-danger': true
})
console.log(classObj, 'reactive')
function changeClass2() {
  classObj.active = !classObj.active
}

// 通过  包装的 状态对象
const classObjRef = ref({
  active: true,
  'text-danger': true
})
console.log(classObjRef, 'ref')
console.log(classObjRef.value, 'ref.value')
function changeClass3() {
  classObjRef.value['text-danger'] = !classObjRef.value['text-danger']
}

//绑定 HTML class:绑定数组 ref
const activeClass2 = ref('active')
const errorClass2 = ref('text-danger')


// 绑定 HTML class: 计算属性
const classObjComp = computed(() => ({
  active: true,
  'text-danger': true
}))

const changeClass4 = () => {
  errorClass2.value = 'text-success'
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
