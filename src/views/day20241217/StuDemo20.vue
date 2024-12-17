<!--
!解包规则：
  1、当 ref 被设置为响应式对象（如 reactive）的属性时，Vue 会对它进行自动解包，即使用 ref.value 的值，而不是 ref 本身。
  2、但在数组或原生集合（如 Map）中，ref 不会被自动解包，必须显式调用 ref.value
  !ps:在 reactive 对象中，ref 会被自动解包;在数组或原生集合中，ref 不会被解包，访问时需要显式调用 .value

!模板中的响应式数据：
  1、ref 会在模板中自动解包。
  2、嵌套数据结构需要注意是否显式调用 .value。
-->
<template>
  <div id="wrap">
    <h1>额外的ref解包细节</h1>
    <!-- <div v-for="(item, index) in dataApp" :key="index">
      {{ item }}
      <p v-for="(itemIn, index) in item" :key="index">{{ itemIn }}</p>
    </div> -->
    <h3>{{ dataApp.myObject.title }}</h3>
    <p>Author: {{ dataApp.myObject.author }}</p>
    <p>Published At: {{ dataApp.myObject.publishedAt }}</p>

    <ul>
      <li v-for="(item, index) in dataApp.items" :key="index">
        {{ item.message }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  name: 'dayStuDemo20',
};
</script>

<script lang="ts" setup>
import { ref, reactive,type Ref } from 'vue';
//将 ref 赋值给 reactive 的属性时，属性会持有整个 ref 对象   修改 reactive 中解包后的属性值（如 countVal），不会影响原始的 ref 对象。
const count = ref(0); //响应式变量
const state = reactive({
  num: count, // 引用count的值
  countval: count.value, //调用count.value的值，并且解绑ref
});
console.log(state.num); // 输出的引用count的值
console.log(state.countval); // 输出的是 0
//修改state里面的值
state.num = 200; //修改state里面的值，会影响原始的ref对象value
state.countval = 100; //修改state里面的值，不影响解绑ref的值
console.log(count.value); // 输出的是 200
console.log(state.countval); // 输出的是 100

//在数组和集合中的特殊行为:当ref作为响应式数组或原生集合的元素时，不会被自动解包，需要通过 .value 来访问它的值。
/*
解释：
  1、数组和集合中的元素保持ref原样，因此访问时需要使用.value;
  2、这种行为有助于在复杂场景下对 ref 的显式操作
*/
const books = reactive([ref('Vue 3 Guide')]);
console.log(books[0].value);
const map = reactive(new Map([['count', ref(0)]]));
////类型断言：如果你能确保键 'count' 一定存在，可以使用类型断言
//console.log((map.get('count')  as Ref<number>).value);
////可选链操作符：为了安全地处理可能的 undefined，可以使用可选链
console.log(map.get('count')?.value);

//嵌套结构中的ref和响应式
interface Item {
  message: string;
}

interface MyObject {
  title: string;
  author: string;
  publishedAt: string;
}
const items = ref([
  {
    message: 'Foo',
  },
  {
    message: 'Bar',
  },
]);
const myObject = reactive({
  title: 'How to do lists in Vue',
  author: 'Jane Doe',
  publishedAt: '2016-04-10',
});
interface DataApp {
  items: Ref<Item[]>;
  myObject: MyObject;
}
const dataApp = ref<DataApp>({
  items, // ref 类型数组
  myObject, // reactive 类型对象
});
/*
模板逻辑：
  1、第一层显示 dataApp.items，此处会直接输出 items 的值，因为 dataApp 会被解包。
  2、第二层通过 v-for 嵌套渲染：2-1、外层循环 dataApp 的属性。 2-2、内层循环 items 数组中的每个对象。
*/
</script>

<style lang="scss"></style>
