<!--
!安装依赖：
  pnpm install lodash  代码中涉及debounce方法，这是一个防抖函数，用于限制高频事件的触发。
  pnpm/cnpm i --save-dev @types/lodash
  pnpm install @types/lodash --save-dev
-->
<template>
  <div id="wrap">
    <h1>侦听模拟求情数据</h1>
    <div>
      <input :disabled="isDisabled" v-model="wenti" type="text" placeholder="请输入问题" />
      <p>问题的结果：{{ daan }}</p>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'dayStuDemo33',
}
</script>

<script lang="ts" setup>

import { ref, watch } from 'vue'
import { debounce } from 'lodash'

// 定义接口响应的类型
interface ResData {
  //返回的数据
  data: string
  //响应的信息
  msg: string
  //接口状态码 @description 4000:失败  200：代表请求成功  5000:代表服务器挂了
  code: number | string
}

// 模拟后端请求数据
function fetchDataDemo() {
  return new Promise<ResData>((resolve, reject) => {
    setTimeout(() => {
      resolve({
        data: '你的问题我现在还没有学会,请过两天再问问我,这几天我正在疯狂的吃数据!',
        msg: 'ok',
        code: 200,
      })
    }, 2000)
  })
}

// 问题
const wenti = ref('')
// 问题的答案
const daan = ref('')
// 是否禁用
const isDisabled = ref(false)

watch(
  wenti,
  debounce(async (newVal: string, oldVal: string) => {
    console.log(newVal, 'newVal')
    console.log(oldVal, 'oldVal')
    // 启用Input 禁用
    isDisabled.value = true
    // 获取接口响应的数据，并把数据部分结构出来
    const { data } = await fetchDataDemo()
    // 把回答的问题数据赋值给响应变量
    daan.value = data
    // 取消Input禁用
    isDisabled.value = false

    // try {
    //   fetchDataDemo().then((res) => {
    //     console.log(res, 'fetchDataDemo:res')
    //     daan.value = res.data
    //     isDisabled.value = false
    //   })
    // } catch (error) {
    //   daan.value = '接口数据请求错误'
    // }
  }, 2000),
)
</script>
