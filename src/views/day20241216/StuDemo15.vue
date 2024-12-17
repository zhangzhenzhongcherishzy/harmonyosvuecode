<!--
!ref 函数:ref 用于定义响应式数据，其核心特性包括
  用法：创建单个响应式值或深层响应式对象（需要 .value 访问或修改）
  工作原理：通过封装一个 value 属性来实现响应性
  适用场景:
      1、定义简单的基本类型（如 number、string、boolean）
      2、定义对象时可以显式控制响应性（如深层响应式或整体替换对象）
  注意：
      1、访问和修改 ref 对象时需要通过 .value
      2、ref 可用于深层响应性，但需要谨慎操作，避免直接操作非响应式属性

!reactive 函数:reactive 用于将整个对象转换为响应式对象
  用法：直接对普通对象进行响应式包装
  工作原理：通过 Proxy 代理对象的属性访问，实现深层响应性
  适用场景:
      1、定义复杂的对象结构时（例如嵌套对象）
      2、不需要直接控制响应性，仅关注对象属性变化
  注意：
      1、reactive 会对对象的所有属性进行响应式代理
      2、直接替换整个 reactive 对象不会触发 UI 刷新，必须操作对象内部的属性

!ref 与 reactive 的区别
特性	                        ref	                           reactive
数据类型	              可用于基本类型和对象	                仅可用于对象
访问方式	          基本类型使用.value;对象使用.value	       直接访问对象属性
深层响应性	            需要显式定义或整体替换	             自动实现深层响应性
整体替换	            支持通过 value 替换整个对象	        不支持整体替换，需要修改内部属性
适用场景	           简单数据或需要整体替换的深层对象	          复杂的嵌套对象

!ref 和 reactive 的结合场景
  1、ref 用于管理单个对象或基本值的响应性。
  2、reactive 用于管理复杂的嵌套对象结构
?ps:
  1、当需要整体替换对象时，使用 ref。
  2、当需要频繁操作对象内部属性时，使用 reactive。
  3、对于复杂场景，推荐将 ref 和 reactive 结合使用。
-->
<template>
  <div id='wrap'>
    <h1>声明响应式状态 ref & reactive</h1>
    <!-- ref() 函数  响应式的原理：只要有状态变量改变，程序都最后就会触发UI的渲染，非状态变量也会别感染 -->
    <h3>ref() 函数</h3>
    <p>{{ numC }}</p>
    <p>{{ dataNumC }}</p>
    <p>{{ dataBool ? dataStr : "阿里巴巴" }}</p>
    <p>
      <button type="button" @click="changeNumC">普通变量累计</button>
      <button type="button" @click="changDataNumC">响应式变量的累加</button>
      <button type="button" @click="changDataNumC1">响应式变量的累加带动普通变量累加</button>
    </p>
    <hr>


    <!-- ref()函数 - 深层响应性 -->
    <h3>ref()函数 - 深层响应性</h3>
    <button @click="editAllRefData">ref深层影响</button>
    <p>{{ `序号：${dataObj1.count}；学习内容：${dataObj1.strArr[0]}；姓名：${dataObj1.user.name}；性别：${dataObj1.user.sex}` }}</p>
    <p @click="accDataobjCount">dataObj1.count: {{ dataObj1.count }}</p>
    <ul @click="editSex">
      <li v-for="(item,index) in dataObj1.strArr" :key="index" @click="pushDataObjStrArr">{{ item }}</li>
    </ul>
    <ul>
      <li v-for="(item,key,index) in dataObj1.user" :key="index">ket:{{ key }} ---- value:{{ item }} ---- index:{{ index }}</li>
    </ul>
    <hr>


    <!-- reactive() 函数:将使对象本身具有响应性 -->
    <button @click="editAllRefData2">reactive深层影响</button>
    <p>{{ `序号：${dataObj2.count}；学习内容：${dataObj2.strArr[0]}；姓名：${dataObj2.user.name}；性别：${dataObj2.user.sex}` }}</p>
    <p @click="accDataobjCount2">dataObj1.count: {{ dataObj1.count }}</p>
    <ul @click="editSex2">
      <li v-for="(item,index) in dataObj2.strArr" :key="index" @click="pushDataObjStrArr2">{{ item }}</li>
    </ul>
    <ul>
      <li v-for="(item,key,index) in dataObj2.user" :key="index">ket:{{ key }} ---- value:{{ item }} ---- index:{{ index }}</li>
    </ul>

  </div>
</template>

<script lang='ts'>
export default {
  name: 'dayStuDemo15',
}
</script>

<script lang='ts' setup>
import { reactive, ref, type Ref } from 'vue';
// ref() 函数  响应式变量回触发UI刷新
let numC = 0
const dataNumC: Ref<number> = ref(0)
const dataStr = ref<string>('鸿蒙开发')
const dataBool = ref<boolean>(true)
//普通变量的累加
const changeNumC = () => {
  numC++
};
//响应式变量的累加
const changDataNumC = () => {
  dataNumC.value++
}
//响应式变量触发UI刷新，而普通变量也会刷新
const changDataNumC1 = () => {
  dataNumC.value++;
  numC++
}

// ref()函数 - 深层响应性
interface Iuser {
  name: string,
  sex: string,
  age: number
}
interface IdataObj1<T> {
  count: number
  strArr: string[],
  user: T
}
const dataObj1 = ref<IdataObj1<Iuser>>({//深层响应性ref
  count: 0,
  strArr: ['PHP', '刘强东', '码云', '蔡徐坤', '雷军', '任正非', '马化腾'],
  user: {
    name: '小红',
    sex: 'nan',
    age: 16
  }
})
const editAllRefData = () => {// 替换ref根级别的值
  dataObj1.value = {
    count: 1,
    strArr: ['鸿蒙开发', '刘强东', '码云', '蔡徐坤', '雷军', '任正非', '马化腾'],
    user: {
      name: '小明',
      sex: '男',
      age: 16
    }
  }
}
const accDataobjCount = () => {
  dataObj1.value.count++
}
const pushDataObjStrArr = () => {
  dataObj1.value.strArr.push('张柏芝')
}
const editSex = () => {
  dataObj1.value.user.sex = '女'
}



// reactive() 函数:将使对象本身具有响应性
const dataObj2: IdataObj1<Iuser> = reactive({//深层响应性reactive
  count: 0,
  strArr: ['PHP', '刘强东', '码云', '蔡徐坤', '雷军', '任正非', '马化腾'],
  user: {
    name: '小绿',
    sex: '男',
    age: 16
  }
})
const editAllRefData2 = () => {// 替换reactive根级别的值   需要直接修改其内部属性，而不是尝试替换整个对象
  console.log('aaaaa');
  dataObj2.count = 1;
  dataObj2.strArr[0] = '鸿蒙开发'
  dataObj2.user.name = '小小'
  dataObj2.user.sex = '女'
  // dataObj2 = {
  //   count: 2,
  //   strArr: ['鸿蒙开发', '刘强东', '码云', '蔡徐坤', '雷军', '任正非', '马化腾'],
  //   user: {
  //     name: '小刚',
  //     sex: '男',
  //     age: 18
  //   }
  // }
}
const accDataobjCount2 = () => {
  dataObj2.count++
}
const pushDataObjStrArr2 = () => {
  dataObj2.strArr.push('张柏芝')
}
const editSex2 = () => {
  dataObj2.user.sex = '女'
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
