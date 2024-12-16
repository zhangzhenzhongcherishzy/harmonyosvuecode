<!--
1、 无法直接操作基础数据类型
  表现：reactive 只能处理对象类型，不能直接处理基本类型（如 number、string、boolean 等）。
  原因：基本类型是值类型，不能通过 Proxy 代理修改值本身。
  解决方案： 使用 ref 处理基本类型

2、无法响应原型链上的属性变化
  表现：通过对象原型链继承的属性不会被代理，因此不会触发响应式更新。
  原因：reactive 仅代理对象本身的直接属性，而不包括原型链上的属性
  解决方案： 避免对原型链属性使用 reactive，将需要响应的属性直接定义在对象上

3、直接替换对象无法触发更新
  表现：直接替换 reactive 对象本身，不会触发响应式更新。
  原因：reactive 是通过代理对象的属性来实现响应式的，替换对象会导致丢失代理。
  解决方案： 修改对象的内部属性，而不是替换整个对象。

4. 不支持响应数组方法的返回值
  表现：数组方法（如 map、filter、slice 等）返回的新数组不是响应式的。
  原因：这些方法返回的数组是普通对象，不会继承响应性。
  解决方案： 如果需要新数组的响应性，可以使用 ref 或 reactive 包装返回值。

5、循环引用导致无限递归
  表现：如果对象之间存在循环引用，reactive 会重复代理，可能导致性能问题或栈溢出。
  原因：reactive 会对嵌套对象进行深度代理，遇到循环引用时会无限递归。
  解决方案： 避免使用循环引用的结构，或者在设计时尽量简化数据关系。

6. 对象属性的动态添加不会自动响应
  表现：动态添加到 reactive 对象的属性不能触发响应式更新。
  原因：Vue 依赖 Proxy 的 set 拦截器处理现有属性，但无法侦测动态添加的属性。
  解决方案： 使用 Vue.set 或初始化对象时声明所有可能的属性。

7. 非响应式的引用类型
  表现：reactive 处理对象中的引用类型（如数组、对象）时，会包装引用类型为新的响应式代理，但如果直接赋值基础类型（如数字、字符串），则不会包装。
  原因：基础类型本身不可被代理
-->
<template>
  <div id='wrap'>
    <h1>Reactive包装注意事项</h1>
    <!-- !1、 无法直接操作基础数据类型 -->
    <p>{{ `${count}:${counts}` }}</p>
    <button @click="count++">改变</button>
    <button @click="counts++">改变</button>
    <hr>


    <!-- !2、无法响应原型链上的属性变化 -->
    <p>{{ `${parent.name}:${child.name}` }}</p>
    <button @click="parent.name = 'abc';">改变parent.name</button>
    <button @click="child.name = 'def'">改变child.name</button>
    <hr>

    <!-- !3、直接替换对象无法触发更新 -->
    <p>{{ `${state.count}` }}</p>
    <hr>

    <!-- !4、直接替换对象无法触发更新 -->
    <p>{{ `${list[0]}----${newList[0]}` }}</p>
    <button @click="list[0]++">改变list++</button>
    <button @click="newList[0]++">改变newList++</button>
    <hr>

    <!-- !6. 对象属性的动态添加不会自动响应 -->
    <p>{{ `${states.newProp}` }}</p>
    <button @click="states.newProp = '1111111111'">states改变</button>
    <hr>


  </div>
</template>

<script lang='ts'>
export default {
  name: 'dayStuDemo16',
}
</script>

<script lang='ts' setup>
import { ref, reactive } from 'vue'
// 1、 无法直接操作基础数据类型
const count = reactive(0); //因为 `reactive` 需要一个对象类型
const counts = ref(0);


// 2、无法响应原型链上的属性变化
const parent = { name: 'Parent' };
const child = reactive(Object.create(parent));
console.log(child.name); // 'Parent' —— 可访问原型链上的属性
child.name = 'Child';   // 直接在子对象上添加 name 属性，但不会影响原型链
console.log(parent.name); // 'Parent'


// 3、直接替换对象无法触发更新
const state = reactive({ count: 0 });
// state = { count: 1 }; // ❌ 直接替换整个对象会导致失去响应性
state.count = 1; // ✅ 推荐


// 4. 不支持响应数组方法的返回值
const list = reactive([1, 2, 3]);
const newList = list.map(item => item * 2);
console.log(newList); // [2, 4, 6] —— 新数组不是响应式的
// const newList = reactive(list.map(item => item * 2)); // ✅ 推荐

// 5、循环引用导致无限递归
const obj = { a: null };
obj.a = obj;
//const reactiveObj = reactive(obj); // ⚠️ 潜在的性能问题

//6. 对象属性的动态添加不会自动响应
const states = reactive({});
states.newProp = 'value'; // 动态添加的属性不会触发 UI 更新
// const states1 = reactive({name:'aaa',newProp: '' });
// state.newProp = 'value'; // ✅ 可触发响应

// 7. 非响应式的引用类型
const state2 = reactive({ next: {} });
state.next2 = 3; // 基础类型不会变成响应式

</script>

<style lang='scss'></style>
