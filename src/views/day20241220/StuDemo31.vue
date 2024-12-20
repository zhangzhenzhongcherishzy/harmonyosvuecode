<!--
!什么是 computed (计算属性)：
  computed 是 Vue 3 提供的 API，用于定义计算属性。计算属性是一种基于响应式数据派生出新值的方式。与普通方法不同，计算属性的结果会 缓存，只有当其依赖的响应式数据发生变化时，才会重新计算

!计算属性的主要作用:
  1、简化模板逻辑： 将复杂的逻辑从模板中抽离出来，提高代码可读性。
  2、性能优化： 结果会被缓存，避免在每次重新渲染时重复执行不必要的逻辑
  3、双向绑定（可写计算属性）： computed 既可以是只读的，也可以是可写的（带有 get 和 set 方法），用于实现复杂的双向绑定逻辑。

!computed 的属性和用法：
  1、只读计算属性：
      1-1、传入一个 getter 函数，返回一个ref。
      1-2、如果依赖的数据未变化，重复访问时会返回缓存的值
  2、可写计算属性：
      2-1、提供 get 和 set 方法。
      2-2、get 用于获取计算属性值。
      2-3、set 用于更新关联的数据。
  3、响应式缓存：如果数据未发生变化，计算属性不会重新执行，提升性能。
  4、与普通函数的区别：普通函数每次调用都会重新计算，计算属性则有缓存机制。

!与普通函数的区别：
  1、计算属性缓存结果，不会重复计算。
  2、普通函数每次调用都会重新计算。
-->
<template>
  <div id="wrap">
    <h1>计算属性</h1>
    <!-- 普通函数计算重复次数 -->
    <div>
      在模板中计算：
      {{ author.books.length > 1 ? author.books.join('-') : author.books[0] }}
    </div>
    <input type="text" v-model="bookName" />
    <button type="button" @click="addNewBook">新加一本书</button>
    <hr />

    <!-- 比较普通函数和计算属性 -->
    <div v-for="item in 5" :key="item">
      <p>计算属性：{{ compBooksStr }}</p>
    </div>
    <div v-for="item in 3" :key="item">
      <p>普通函数：{{ funcBooksStr() }}</p>
    </div>

    <!-- 只读计算属性 -->
    <p>用户全名（只读计算属性）：{{ fullName }}</p>
    <hr />

    <!-- 可写计算属性 -->
    <p>全名（可写计算属性）：</p>
    <input type="text" v-model="fullName1" />
    <hr />
  </div>
</template>

<script lang="ts">
export default {
  name: 'dayStuDemo31',
}
</script>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'

const bookName = ref('')
const author = reactive({
  name: 'John Doe',
  books: ['金瓶梅', '活着', '小王子', '让富婆爱上我', '广州富婆通讯录', '让高富帅爱上我'],
})
const addNewBook = () => {
  try {
    if (!bookName.value) {
      throw new Error('请输入输的名字')
    }
    console.log('模拟计算属性')
    author.books.push(bookName.value)
  } catch (error: any) {
    alert(error.msg)
  }
}
//计算属性和普通函数对比
const books = reactive(['Book A', 'Book B', 'Book C'])
const compBooksStr = computed(() => {
  console.log('计算属性重新计算')
  return books.length > 1 ? books.join(' - ') : books[0]
})

function funcBooksStr() {
  console.log('普通函数被调用')
  return books.length > 1 ? books.join(' - ') : books[0]
}

//计算属性
const user = reactive({
  firstName: 'John',
  lastName: 'Doe',
})

// 只读计算属性
const fullName = computed(() => {
  console.log('触发计算');

  return `${user.firstName} ${user.lastName}`
})

// 可写计算属性
const fullName1 = computed({
  get: () => `${user.firstName} ${user.lastName}`,
  set: (value: string) => {
    console.log('计算属性重新计算111')
    const [firstName, lastName] = value.split(' ')
    user.firstName = firstName
    user.lastName = lastName
  },
})
// fullName1.value = '123'
</script>

<style lang="scss">
/* 添加一些样式 */
h1 {
  color: #333;
}
p {
  margin: 8px 0;
}
</style>
