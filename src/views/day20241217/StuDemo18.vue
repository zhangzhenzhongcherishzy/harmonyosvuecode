<!--
Vue 3 使用 Proxy 来实现响应式对象，从而取代了 Vue 2 中基于 Object.defineProperty 的实现。

reactive() 的工作机制
  1、reactive(raw) 返回一个基于raw 的代理对象。
  2、对这个代理对象的属性访问、设置等操作会被 Vue 的响应式系统拦截。
  3、Vue会在这些操作中自动追踪依赖并触发视图更新。

Vue 3 的 reactive 特性：
  1、对象响应式：包装的对象在操作时会触发依赖追踪和更新
  2、自动代理：引用类型会被自动转换为代理，基本类型不会
  3、缓存机制：对同一个对象调用多次 reactive，只会创建一个代理
-->
<template>
  <div id="wrap">
    <h1>Reactive Proxy</h1>
  </div>
</template>

<script lang="ts">
export default {
  name: 'dayStuDemo18',
}
</script>

<script lang="ts" setup>
import { reactive } from 'vue'

//对象不可能有全等的情况
const num1:number = 123
const num2:number = 123
console.log(num1 === num2);

const arr1:unknown = []
const arr2:unknown = []
console.log(arr1 === arr2);

const raw1 = {}
const raw2 = {}
console.log(raw1 === raw2);//它们在创建时分别指向了内存中不同的位置，引用不同，结果为 false 即使它们都是空对象

const raw = { name: '蔡徐坤' } //原对象
const proxy = reactive(raw) //代理对象
// 1. 原始对象和代理对象是不相等的 ： proxy 是通过 Proxy 包装的一个新对象，虽然它与 raw 指向同一个底层数据，但它们在内存中的引用不同
console.log(raw === proxy) // false


// 2. 在同一个对象上多次调用 reactive()，返回的是同一个代理 ：Vue 会缓存同一个对象的代理。如果你多次对 raw 调用 reactive()，它会返回同一个代理对象
console.log('reactive(raw) === proxy：',reactive(raw) === proxy, ) // true
interface RawType {
  name: string;
  next1?: number; // 可选属性
  next2?: object; // 可选属性
}
//场景一
const proxy2:RawType  = reactive(raw)
const proxy3 = reactive(JSON.parse(JSON.stringify(raw)))
proxy2.name = '廖文静'
console.log(proxy2, 'proxy2')
console.log(proxy, 'proxy')
console.log(proxy3, 'proxy3')

// 3. 在代理对象上再次调用 reactive()，返回的还是原来的代理：如果你对一个代理对象再次调用 reactive()，它会直接返回自己，而不会重新生成新的代理。
console.log(reactive(proxy) === proxy)


// 4. 添加一个基本类型的值到代理对象上：基本类型的值（如 number、string）不是引用类型，因此 Vue 不会对其进行代理包装。
const num = 3
proxy2.next1 = num;
console.log('proxy2.next2  === num：',proxy2.next1 === num, ) // num 不是引用类型不会包装 故此全等

// 5. 添加一个引用类型的值到代理对象上：引用类型（如对象、数组）在赋值时会被 reactive 自动包装，因此 proxy2.next 实际上是 raw2 的一个代理
proxy2.next2 = raw2;
console.log('proxy2.next === raw2：', proxy2.next2 === raw2,)
</script>

<style lang="scss"></style>
