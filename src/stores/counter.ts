import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }
  return { count, doubleCount, increment }
})

//创建一个简单的 Store 学会定义 State、Getters 和 Actions。  选项式
export const useStoreone = defineStore('counterone', {
  //state定义方法1
  // state: () => ({
  //   count: 0,
  // }),
  //state定义方法2
  state: () => {
    return {
      count: 0,
      name: 'Bob',
      isAdmin: true,
      items: [],
      hasChanged: true,
    }
  },
  getters: {
    doubleCount: (state) => state.count * 2,
    doublePlusone(): number {
      return this.doubleCount + 1 // 使用 this 引用
    },
  },
  actions: {
    increment() {
      this.count++
    },
    // $reset()演示
    // resetState() {
    //   this.$reset(); // 重置 state
    // },
  },
  persist: {
    key: 'userStore',
    storage: localStorage,
  },
})

//创建一个简单的 Store 学会定义 State、Getters 和 Actions。 组合式
export const useStoretwo = defineStore('countertwo', () => {
  //等同于选项式state
  const count = ref(0)
  const name = ref('Bob')
  const isAdmin = ref(true)

  //等同于选项式getters  需要使用computed
  const doubleCount = computed(() => count.value * 2)
  const doublePlusone = computed(() => {
    return doubleCount.value + 1
  })

  //等同于选项式actions
  const increment = () => {
    count.value++
  }
  // 自定义 reset 方法
  const reset = () => {
    count.value = 0
    name.value = 'Bob'
    isAdmin.value = true
  }
  //支持监听
  watch(count, (nVal) => {
    console.log(nVal, 'nVal')
  })

  return { count, name, isAdmin, doubleCount, doublePlusone, increment, reset }
})
