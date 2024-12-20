<!--
watchEffect 是一种更简单的响应式侦听器，用于自动追踪并运行副作用逻辑。它会自动侦听在回调中使用的所有响应式数据，无需显式指定侦听目标

!语法：watchEffect(callback, options?)
  callback:
    1、必需，一个函数，包含副作用逻辑。
    2、函数会自动依赖在其内部使用的响应式数据，当这些数据发生变化时，callback 会重新执行。
  options：
    1、可选，用于配置侦听行为的对象，包含以下属性：
    2、flush: 控制回调的执行时机（'pre'、'post'、'sync'）

!watchEffect 的特点：
  1、自动依赖追踪：内部使用的所有响应式数据都会被侦听。
  2、无需指定依赖：比 watch 更简洁。
  3、立即执行：回调会在绑定后立即执行一次。

!与watch的区别
  1、自动追踪依赖：
    watchEffect 会立即执行传入的函数，并自动追踪该函数内部所依赖的所有响应式数据。如果这些依赖数据发生变化，watchEffect 会重新执行该函数。
    watch 则需要显式地指定要侦听的响应式数据（一个或多个）。它不会自动追踪依赖。
  2、执行时机：
    watchEffect 在初始化时会立即执行一次，以确保追踪所有依赖。
    watch 只会在侦听的数据发生变化时执行回调函数。
  3、获取旧值和新值：
    watchEffect 只能在回调函数重新执行时获取到新值，无法直接获取旧值。不过，可以在回调函数内部手动保存旧值，以便在后续的执行中使用。
    watch 可以获取到侦听的数据变化前后的旧值和新值。
  4、停止侦听：
    两者都返回一个停止侦听的函数。可以调用这个函数来停止侦听响应式数据的变化。
-->
<template>
  <div id="wrap">
    <h1></h1>
    <!-- 监听响应式变量 -->
    <p>inputVal：<input type="text" v-model="inputVal" /></p>
    <hr />

    <!-- 监听计算属性 -->
    <p>
      <label for="">num1：</label>
      <input type="text" v-model="num1" />
      <label for="">num2：</label>
      <input type="text" v-model="num2" />
    </p>
    <button>求和：{{ sumNum }}</button>
    <hr />

    <p>
      <input type="text" v-model="ruser.name" />
      <input type="text" v-model="ruser.sex" />
      <input type="text" v-model="ruser.love.hobby" />
    </p>
  </div>
</template>

<script lang="ts">
export default {
  name: 'dayStuDemo34',
};
</script>

<script lang="ts" setup>
import { ref, reactive, computed, watch, watchEffect } from 'vue';
//ref响应式变量(包括计算属性)
const inputVal = ref('默认值');
const num1 = ref(0);
const num2 = ref(0);
const ruser = reactive({
  name: '鸡坤',
  sex: '男',
  love: {
    hobby: '唱，跳，rap',
  },
});
//监听响应式的变量
// watch(inputVal, (newValue, oldValue) => {
//   console.log(`新值：${newValue},旧值：${oldValue}`);
// });
// watchEffect(() => {
//   console.log(`新监听器监听的数据：${inputVal.value}`);
// });

//监听计算属性
const sumNum = computed(() => {
  return num1.value + num2.value;
});
// watch(sumNum, (newValue, oldValue) => {
//   console.log(`新值：${newValue},旧值：${oldValue}`);
// });
// watchEffect(() => {
//   console.log(`新监听器监听的数据：${sumNum.value}`);
// });

//监听getter函数
// watch(
//   () => inputVal.value,
//   (newValue, oldValue) => {
//     console.log(newValue, 'getter:newVal');
//     console.log(oldValue, 'getter:oldVal');
//   },
// );
// watchEffect(() => {
//   console.log((() => inputVal.value)());
// });
// watch(
//   () => num1.value * num2.value,
//   (newValue, oldValue) => {
//     console.log(`求和新值：${newValue}  ； 求和旧值：${oldValue}`);
//   },
// );
// watchEffect(() => {
//   const sum = (() => num1.value * num2.value)()
//   console.log(sum);
// });

//多个数组源组成的数组
// watch(
//   [inputVal, () => num1.value * num2.value, () => inputVal.value, () => num1.value + num2.value],
//   ([a1, b1, c1, d1], [a2, b2, c2, d2]) => {
//     console.log(a1,a2);
//     console.log(b1,b2);
//     console.log(c1,c2);
//     console.log(d1,d2);
//   },
// );
// watchEffect(() => {
//   const [inputVal1,ride,iptVal,sum] = [inputVal, (() => num1.value * num2.value)(), (() => inputVal.value)(), (() => num1.value + num2.value)()]
//   console.log(
//     inputVal1.value,
//     ride,
//     iptVal,
//     sum
//   );
// });

//侦听对象属性    ps:不能直接侦听`响应式对象`的属性值
// watch(ruser.name, (newValue, oldValue) => {//错误演示
//   console.log(`新值：${newValue},旧值：${oldValue}`);
// });
// watch(
//   () => ruser.name, //使用了getter函数侦听属性值
//   (newValue, oldValue) => {
//     console.log(`新值：${newValue},旧值：${oldValue}`);
//   },
// );
// watchEffect(() => {
//   (() => ruser.name)();
//   console.log((() => ruser.name)());
// });

//侦听全部对象  直接给 watch() 传入一个响应式对象，会`隐式地创建一个深层侦听器`——该回调函数在所有嵌套的变更时都会被触发
watch(
  ruser,
  (newValue, oldValue) => {
    console.log(`新值：${newValue.love.hobby},旧值：${oldValue.love.hobby}`);
  },
  { deep: true },
);
watchEffect(() => {
  console.log(`新值：${ruser.love.hobby}`);
});

// 直接给 watch() 传入一个响应式对象，会`隐式地创建一个深层侦听器  需求：显示的加上deep，强制转成浅层监听
watch(
  ruser,
  (newValue, oldValue) => {
    console.log(`新值：${newValue.love.hobby},旧值：${oldValue.love.hobby}`);
  },
  { deep: false },
);

//一次性侦听器   once:true  once和immediate共同使用请注意， once 会把 immediate 触发的一次变化消费掉，once和immediate在一起使用没意义
watch(
  () => ruser.love.hobby as string,
  (newValue, oldValue) => {
    console.log(`新值：${newValue},旧值：${oldValue}`);
  },
  {
    deep: true,
    immediate: true,
    once: true,
  },
);
</script>

<style lang="scss"></style>
