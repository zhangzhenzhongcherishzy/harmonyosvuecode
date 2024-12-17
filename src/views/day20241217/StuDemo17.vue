<!--
!Proxy 对象是ES6新出的一个特性，用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）。在Vue3中数据劫持原理采用的是Proxy代理。Proxy可以直接监听整个对象而非属性，可以监听数组的变化，具有多达13中拦截方法。

特点：
  1、代理：Proxy 是一个中间人，它代表着你对原始对象的操作。
  2、拦截：可以监听 get、set 等操作，并定义自定义逻辑。
  3、透明：代理看起来就像原始对象，但它可以增强对象的行为。

扩展：需要知道的是，在Vue2中双向数据绑定原理（数据劫持）采用Object.defineProperty，而在Vue3中数据劫持原理采用的是Proxy代理。

为什么Proxy会取代Object.defineProperty：
  1、Object.defineProperty只能劫持对象的属性，不能监听数组。也不能对 es6 新产生的 Map,Set 这些数据结构做出监听。也不能监听新增和删除操作等等。
  2、Proxy可以直接监听整个对象而非属性，可以监听数组的变化，具有多达13中拦截方法。

语法使用：
  let p = new Proxy(target, handler);
    1、其中参数 target 为包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）。
    2、其中参数 handler 为具体操作，其实就是一个对象，其属性是当执行一个操作时定义代理的行为的函数。就是说里面写各种拦截的函数。不同的拦截方法拦截的是不同的操作。

!get方法：get（target, property, receiver）方法用于拦截某个属性的读取操作，可以接受三个参数，分别为目标对象、属性名和 proxy 实例本身。
!set方法：set(target, property, value, receiver)方法用来拦截某个属性的赋值操作,四个参数依次为目标对象、属性名、属性值和 Proxy 实例本身，其中最后一个参数可选
!apply方法：apply方法能拦截函数的调用、call和apply操作。apply(target, thisArg, argumentsList) 三个参数，分别是目标对象、被调用时的上下文对象、被调用的参数数组
!constructor方法：construct(target, argumentsList, newTarget)拦截的是new操作，target目标对象，argumentsList参数列表，newTarget最初被调用的构造函数。简单来说就是拦截new一个构造函数的方法

使用场景：
  1、日志记录：在访问对象属性时打印日志
  2、数据校验：在设置对象属性时进行校验
  3、动态计算属性：动态生成属性值，而不修改原对象
  4、实现只读对象：禁止修改对象的属性

1、get(target, propKey, receiver)：
拦截对象属性的读取，比如proxy.foo和proxy[‘foo’]。
2、set(target, propKey, value, receiver)： 拦截对象属性的设置，比如proxy.foo =
v或proxy[‘foo’] = v，返回一个布尔值。
3、has(target, propKey)：
拦截propKey in proxy的操作，返回一个布尔值。
4、deleteProperty(target, propKey)：
拦截delete proxy[propKey]的操作，返回一个布尔值。
5、ownKeys(target)：
拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for…in循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性。
6、getOwnPropertyDescriptor(target, propKey)：
拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。
7、defineProperty(target, propKey, propDesc)：
拦截Object.defineProperty(proxy, propKey,
propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。
8、preventExtensions(target)：
拦截Object.preventExtensions(proxy)，返回一个布尔值。
9、getPrototypeOf(target)：
拦截Object.getPrototypeOf(proxy)，返回一个对象。
10、isExtensible(target)：
拦截Object.isExtensible(proxy)，返回一个布尔值。
11、setPrototypeOf(target, proto)：
拦截Object.setPrototypeOf(proxy,
proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
12、apply(target, object, args)：
拦截Proxy 实例作为函数调用的操作，比如proxy(…args)、proxy.call(object,
…args)、proxy.apply(…)。
13、construct(target, args)：
拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(…args)。
-->
<template>
  <div id="wrap">
    <h1>Proxy</h1>
  </div>
</template>

<script lang="ts">
export default {
  name: 'dayStuDemo17',
}
</script>

<script lang="ts" setup>
/*-------------------vue2:es5处理代理语法Object.defineProperty----------------------*/
// interface A {
//   name:string
// }
// const obj:A= {name:'小明'}
// // Object.defineProperty参数分别为：对象本身、对象值、get和set方法
// Object.defineProperty(obj,'name',{
//     get(){
//         console.log("666")
//         return "GET IT"
//     },
//     set(){
//         console.log("SET")
//     }
// })
// console.log(obj.name)// 666 GET IT
/*-------------------1、日志记录：在访问对象属性时打印日志----------------------*/
// interface A {
//   name:string
//   age:string
// }
// const obj:A = { name: 'jack', age: '20' }
// const p = new Proxy(obj, {
//   get(target, property:keyof A) {
//     console.log(`属性 ${property} 被读取`);
//     return target[property];
//   },
// });
// console.log(p.name); // 日志：属性 name 被读取
// console.log(p.age); // 日志：属性 age 被读取
/*-------------------2、数据校验：在设置对象属性时进行校验----------------------*/
// 场景一
// interface A {
//   age:number
// }
// const obj:A = { age: 20 };
// obj.age = 23
// obj.age = '23'
// const p = new Proxy(obj, {
//   set(target, property:keyof A, value) {
//     if (property === 'age' && typeof value !== 'number') {
//       throw new Error('年龄必须是数字');
//     }
//     target[property] = value;
//     return true;
//   },
// });

// p.age = 25; // 成功
// p.age = 'abc'; // 报错：年龄必须是数字
//场景二
// interface A {
//   name: string
//   age: number
// }
// const obj = { name: 'jack', age: 20 }
// const p = new Proxy(obj, {
//   set(target, property, value:number) {
//     console.log('要设置对象属性？我拦截到了~')
//     console.log('要修改成' + value + '?')
//     console.log('我就不给你改，我改成666')
//     target[property as 'age'] = 666
//   },
//   get(target, property:keyof A) {
//     console.log(`属性 ${property} 被读取`);
//     return target[property]
//   },
// })
// //修改obj.age的值为30;
// p.age = 30
// console.log(p.age)
/*-------------------3、动态计算属性：动态生成属性值，而不修改原对象----------------------*/
// const obj = { name: 'jack' };
// const p = new Proxy(obj, {
//   get(target, property) {
//     if (property === 'greeting') {
//       return `Hello, ${target.name}`;
//     }
//     return target[property];
//   },
// });

// console.log(p.greeting); // 输出：Hello, jack
// console.log(obj.greeting); // 原对象无此属性
/*-------------------4、实现只读对象：禁止修改对象的属性----------------------*/
interface A {
  name: string
  age: number
}
const obj:A = { name: 'jack', age: 20 };
const p = new Proxy(obj, {
  set(target, property:keyof A, value) {
    console.log(`不能修改属性 ${property}`);
    return false; // 返回 false 表示设置失败
  },
});

// p.age = 25; // 不能修改属性 age
console.log(p.age); // 仍为 20

</script>

<style lang="scss"></style>
