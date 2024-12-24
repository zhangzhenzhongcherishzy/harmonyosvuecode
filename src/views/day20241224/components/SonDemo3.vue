<template>
  <h3>组合式api :props</h3>

  <div>
    <div>
      <h3 @click="editTitle">{{ tle }}</h3>
      <p>props.des: {{ des }}</p>
      <p>props.user.name: {{ user.name }}</p>
      <p>props.user.sex: {{ user.sex }}</p>
    </div>

    <div v-show="isShow" class="isShowHide">显示或隐藏</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  des: {
    type: [String, Number],
    default: 'des默认值'
  },
  dao: {
    type: Object,
    default() {
      return {
        name: '青龙偃月刀'
      }
    }
  },
  user: {
    type: Object,
    default(rawProps: any) {
      // 获取除自己之外的 Props的属性值
      console.log(rawProps, 'rawProps')
      return {
        name: '志超' + rawProps.title,
        sex: 1
      }
    }
  },
  des2: {
    type: [String, Number],
    default: 'des2默认值'
  },
  // 函数类型的默认值
  propH: {
    type: Function,
    // 不像对象或数组的默认，这不是一个
    // 工厂函数。这会是一个用来作为默认值的函数
    default() {
      console.log('子组件props函数被调用')

      return 'Default function'
    }
  }
})

const tle = ref(props.title)
const isShow = ref(false)
const sonTitle = ref('sd2Demo的sonTitle ')

const showHandler = () => {
  isShow.value = !isShow.value
}
const editTitle = () => {
  // 不能直接修改 props的值
  // this.title = '修改后的值' // Unexpected mutation of "title" prop.
  // 可以修改被props的值初始化后的状态变量
  tle.value = '可以修改被props的值初始化后的状态变量'

  // 调用子组件传过来的函数
  props.propH(sonTitle.value, showHandler)
}
</script>

<style lang="scss" scoped>
.isShowHide {
  height: 100px;
  width: 100px;
  background-color: cyan;
}
</style>
