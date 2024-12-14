<!--
!属性绑定:
  作用：
    通过 v-bind 或 : 绑定动态属性值，例如 class、style、自定义属性等
  语法：
    <el-button :type="istrue ? 'primary' : 'danger'">Dynamic Button</el-button>
    ps:根据条件动态绑定 class

!修饰符作用对比：
修饰符/方法	                    功能	                            示例
@click.once	           事件处理函数只触发一次	              @click.once="handler"
@click.stop	                阻止事件冒泡	                 @click.stop="handler"
event.stopPropagation()	原生方法，阻止事件冒泡	          调用 even.stopPropagation()
click.prevent：是 Vue 的事件修饰符，用于阻止元素的默认行为。在表单中，<button type="submit"> 默认会触发表单的提交行为，导致页面刷新。使用 @click.prevent 可以防止这一默认行为
-->
<template>
  <div id="wrap">
    <!-- todo简单的绑定属性演示 -->
    <h1 :nav>模板语法-属性</h1>
    <hr />

    <!-- todo动态变量和属性绑定的使用 -->
    <button type="button" :disabled="isDisabled" v-on:click="changeId" class="btn">
      改变isTrue的值：{{ isTrue }}
    </button>
    <button type="button" :disabled="isDisabled" v-on:click="changeBindId" class="btn">
      改变bindId的值：{{ bindId }}
    </button>
    <div id="commonId">正常commonId元素</div>
    <div v-bind:id="bindId">{{ bindId }}</div>
    <div v-bind:id="isTrue ? bindId : 'commonId'">{{ isTrue ? bindId : 'commonId' }}</div>

    <!-- todo绑定属性isDisabled作用类似于取反 -->
    <button @click="isDisabled = !isDisabled">取反</button>

    <!-- todo定多个属性 -->
    <p v-bind="objectOfAttrs">我是多属性标签</p>
    <hr />

    <!-- todo可以在绑定的表达式中使用一个组件暴露的方法 -->
    <p :id="returnJionStr()" v-bind:class="returnJionStr()">
      {{ returnJionStr() }}
    </p>
    <hr />

    <!-- todo指令 Directives v-if -->
    <p v-if="isTrue">我是v-if指令控制的</p>
    <hr />

    <!-- todo参数 Arguments   某些指令会需要一个“参数”，在指令名后通过一个冒号隔开做标识 -->
    <a href="http://www.baidu.com">跳转百度</a>
    <a :href="`http://www.baidu.com/s?wd=${keyworlds}`">在百度搜索国足</a>
    <img :src="`/src/assets/images/${imgStr}.jpg`" alt="" @click="imgStr = 8" />
    <hr />

    <!--todo动态参数 ：同样在指令参数上也可以使用一个 JavaScript 表达式，需要包含在一对方括号内[]-->
    <a v-bind:[attributeName]="`http://www.baidu.com`">动态参数跳转百度</a>
    <a :[attributeDataName]="'data-a'" :[attributeName]="`http://www.baidu.com`">
      多个动态参数跳转百度
    </a>
    <a :[`${attributeDataName}NewAttr`]="'data-a'" :[attributeName]="`http://www.baidu.com`">
      {{ `新增多个动态参数跳转百度：${attributeDataName}NewAttr` }}
    </a>
    <a @[eventName]="() => console.log('我是动态绑定的一个点击')">点我打印</a>
    <hr />

    <!-- todo点击阻止冒泡:行为：当用户点击 outer 元素时，只会输出一次 outer被点了 || 原理：Vue 内部会在第一次执行事件处理函数后自动移除该事件监听器 -->
    <div class="outer" @click.once="() => console.log('outer被点击了')">
      outer元素
      <div class="inner" @click.stop="console.log('inner被点击了')">
        inner元素
        <div class="child" @click="stopM">child元素</div>
      </div>
    </div>

    <!-- todo阻止元素的默认行为 -->
    <form action="http://www.baidu.com/s">
      <input type="text" name="wd" placeholder="请输入内容..." />
      <button type="reset">重置</button>
      <button type="submit" @click.prevent="() => console.log('禁止跳转百度')">提交</button>
    </form>
  </div>
</template>

<script lang="ts">
export default {
  name: 'dayStuDemo9',
}
</script>

<script lang="ts" setup>
import { ref } from 'vue'
//简单的绑定属性演示
const nav = ref<string>('arrtName')
//动态变量和属性绑定的使用
const bindId = ref('stuId')
const isDisabled = ref(false)
const isTrue = ref(false)
function changeId() {
  isTrue.value = true
}
function changeBindId() {
  bindId.value = 'commonId'
}
//用于绑定多个属性
const objectOfAttrs = {
  id: 'container',
  class: 'wrap',
  style: 'background-color:green',
}
//绑定的表达式中使用一个组件暴露的方法
function returnJionStr() {
  const arrs = ['hello', 'world']
  return arrs.join('_')
}
//参数 Arguments
const keyworlds = '国足'
const imgStr = ref(5)

//动态参数
const attributeName = 'href'
const attributeDataName = 'data-a'
const eventName = 'click'

//原DOM里阻止冒泡事件
//MouseEvent 类型：MouseEvent 是 TypeScript 内置的类型，用于描述鼠标事件（如 click、mousemove 等）。
const stopM = (event: MouseEvent) => {
  event.stopPropagation()
  console.log(event, 'child被点击了')
}
</script>

<style lang="scss">
@use '@/assets/common.scss'; //使用封装的公共样式
#commonId {
  color: red;
}
#stuId {
  color: blueviolet;
}
.outer {
  width: 300px;
  height: 150px;
  background-color: purple;
  margin: 0 auto;
  .inner {
    height: 100px;
    width: 200px;
    margin: 0 auto;
    background-color: rgb(57, 104, 151);
    .child {
      height: 50px;
      width: 100px;
      margin: 0 auto;
      background-color: rgb(143, 151, 57);
    }
  }
}
</style>
