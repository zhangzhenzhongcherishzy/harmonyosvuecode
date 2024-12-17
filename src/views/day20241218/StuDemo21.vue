<!--
!响应式 API:工具函数:
  ref:        创建一个响应式的 ref 对象，包含一个 .value 属性，用于存储响应式值。
  isRef:      检查某个值是否是 ref 创建的。

  reactive:   创建一个深层响应式的代理对象
  isReactive: 检查某个对象是否是由 reactive 创建的响应式代理对象。

  readonly :  创建一个只读的代理对象，防止其内部状态被更改
  isReadonly: 检查某个对象是否是由 readonly 创建的只读代理对象

  toRef:      将响应式对象的某个属性单独创建为 ref，保持与源属性的同步;如果传入的是普通值，也可以将其转为 ref
  toRefs:     将一个响应式对象的所有属性转换为独立的 ref 对象。
  unref:      获取 ref 对象的内部值。如果传入的不是 ref，则直接返回原值。

  isProxy:    检查某个对象是否是由 reactive 或 readonly 创建的代理。
!应用场景总结:
  1、isRef / unref 用于检测或解包 ref
  2、toRef / toRefs 用于在属性级别操作响应式对象。
  3、isReactive / isReadonly / isProxy 用于诊断和调试响应式系统
  4、ref 和 reactive 是创建响应式数据的基础。
  5、readonly 提供了安全性，防止数据被意外修改
-->
<template>
  <div id="wrap">
    <h1>响应式 API:工具函数</h1>
  </div>
</template>

<script lang="ts">
export default {
  name: 'dayStuDemo21',
}
</script>

<script lang="ts" setup>
import {
  reactive,
  ref,
  type Ref,
  isReactive,
  isProxy,
  isReadonly,
  isRef,
  readonly,
  toRef,
  toRefs,
  unref,
} from 'vue'
const numC = 0
const dataNumC: Ref<number> = ref(0)
const dataStr = ref<string>('鸿蒙开发')
const dataBool = ref<boolean>(true)
console.log(dataStr, dataBool)
interface Iuser {
  name: string
  sex: string
  age: number
}
interface IdataObj1<T> {
  count: number
  strArr: string[]
  user: T
}
/*-------------------------------ref:创建一个响应式的 ref 对象，包含一个 .value 属性，用于存储响应式值。-------------------------------- */
// 深层响应性 ref
const dataObj1: Ref<IdataObj1<Iuser>> = ref({
  count: 0,
  strArr: ['php', '刘强东', '马云', '马化腾', '任正非'],
  user: {
    name: '刘强东',
    sex: 'nan',
    age: 42,
  },
})
/*-------------------------------isRef:检查某个值是否是 ref 创建的。-------------------------------- */
console.log('isRef(dataObj1)：', isRef(dataObj1)) //true
console.log('isRef(dataNumC)：', isRef(dataNumC)) // true
console.log('isRef(numC)：', isRef(numC)) // false

/*-------------------------------reactive:创建一个深层响应式的代理对象-------------------------------- */
const dataObj2: IdataObj1<Iuser> = reactive({
  count: 0,
  strArr: ['php', '刘强东', '马云', '马化腾', '任正非'],
  user: {
    name: '刘强东',
    sex: 'nan',
    age: 42,
    aihao: {},
  },
})
const dataObj3 = {
  count: 0,
  strArr: ['php', '刘强东', '马云', '马化腾', '任正非'],
  user: {
    name: '刘强东',
    sex: 'nan',
    age: 42,
    aihao: {},
  },
}
/*-------------------------------isReactive: 检查某个对象是否是由 reactive 创建的响应式代理对象。-------------------------------- */
console.log('isReactive(dataObj3)：', isReactive(dataObj3))
console.log('isReactive(dataObj2)：', isReactive(dataObj2))
console.log('isReactive(dataObj1)：', isReactive(dataObj1))

/*-------------------------------readonly: 创建一个只读的代理对象，防止其内部状态被更改-------------------------------- */
const obj = readonly({ count: 0 })
console.log(obj.count) // 0
// obj.count = 1; // 会报错，不能修改 readonly 对象
/*-------------------------------isReadonly: 检查某个对象是否是由 readonly 创建的只读代理对象-------------------------------- */
console.log(isReadonly(obj)) // true
console.log(isReadonly(dataObj1)) // false

/*-------------------toRef:将响应式对象的某个属性单独创建为 ref，保持与源属性的同步;如果传入的是普通值，也可以将其转为 ref------------------- */
const state = reactive({ foo: 1, bar: 2 })
const fooRef = toRef(state, 'foo')
console.log(fooRef.value) // 1
fooRef.value = 100
console.log(state.foo) // 100
const numCToRef1 = toRef(numC)
console.log(numCToRef1, 'numCToRef1  = toRef(numC)')
const dataCountCToRef = toRef(dataObj3)
console.log(dataCountCToRef.value, 'toRef(dataObj3.count)')
const newdataObj3: any = {}
for (const key in dataObj3) {
  //遍历 dataObj3 对象的所有可枚举属性。
  if (Object.prototype.hasOwnProperty.call(dataObj3, key)) {
    //确保属性确实是 dataObj3 自身的属性，而不是从原型链继承的。 这是一个安全检查，防止操作不必要的原型链上的属性。
    newdataObj3[key as keyof typeof dataObj3] = toRef(dataObj3[key as keyof typeof dataObj3]) //将 dataObj3 的每个属性转为一个独立的 ref 对象toRef 保证生成的 ref与对象属性保持同步：修改 newdataObj3[key].value，会同步修改 dataObj3[key]。反之亦然。
  }
}
console.log(newdataObj3.count, 'newdataObj3.count')
console.log(newdataObj3.strArr, 'newdataObj3.strArr')
console.log(newdataObj3.user, 'newdataObj3.user')

/*-------------------------------toRefs: 将一个响应式对象的所有属性转换为独立的 ref 对象；ref初始值的时候用 toRef()-------------------------------- */
const state1 = reactive({ foo: 1, bar: 2 })
const { foo, bar } = toRefs(state)
console.log(foo.value, bar.value) // 1  2
foo.value = 100
bar.value = 200
console.log(state1.foo, state1.bar) // 100  200
const numCToRef = toRef(numC)
console.log('numCToRef  = toRef(numC)：', numCToRef)

/*-------------------------------unref:获取 ref 对象的内部值。如果传入的不是 ref，则直接返回原值。-------------------------------- */
const count = ref(10)
console.log(unref(count)) // 10
console.log(unref(20)) // 20
const newDataNumC = unref(dataNumC)
console.log('dataNumC：', dataNumC)
console.log('unref(dataNumC)：', newDataNumC)
function myUnref(data: unknown) {
  return isRef(data) ? data.value : data
}
console.log('myUnref(dataNumC)：', myUnref(dataNumC))

/*--------------isProxy:检查一个对象是否是由 reactive()、readonly()、shallowReactive() 或 shallowReadonly() 创建的代理。----------------- */
const reactiveObj = reactive({ count: 0 })
const readonlyObj = readonly({ count: 0 })
console.log(isProxy(reactiveObj)) // true
console.log(isProxy(readonlyObj)) // true
</script>

<style lang="scss"></style>
