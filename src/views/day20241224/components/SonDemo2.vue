<template>
  <h3>选项式API(配置):props</h3>

  <div>
    <div>
      <h3 @click="editTitle">{{ tle }}</h3>
      <p>props.des: {{ des }}</p>
      <p>props.dao: {{ dao.name }}</p>
      <p>props.user.name: {{ user.name }}</p>
      <p>props.user.sex: {{ user.sex }}</p>
    </div>

    <div v-show="isShow" class="isShowHide">显示或隐藏</div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    des: {
      type: [String, Number],
      default: 'des默认值',
    },
    //默认值，如果父组件没有传这个，子组件就是用这个自己预设的默认值
    dao: {
      type: Object,
      default() {
        return {
          name: '青龙偃月刀',
        }
      },
    },
    //默认值，如果父组件没有传这个，子组件就是用这个自己预设对象
    user: {
      type: Object,
      default(rawProps:any) {
        //rawProps 是 Vue 在处理 props 的默认值时自动传递给默认值函数的参数。它并不是 Vue API 的一部分，而是特定情况下（如 default 函数中）由 Vue 自动传递的一个对象, rawProps 是 Vue 在调用 props 的 default 函数时传递的参数，它包含了父组件传递给子组件的所有 props 的值
        console.log(rawProps, 'rawProps')
        return {
          name: '小度小度' + rawProps.title,
          sex: 1,
        }
      },
    },
    des2: {
      type: [String, Number],
      default: 'des2默认值',
    },
    // 函数类型的默认值
    propH: {
      type: Function,
      // 不像对象或数组的默认，这不是一个
      // 工厂函数。这会是一个用来作为默认值的函数
      default() {
        console.log('子组件props函数被调用')
        return 'Default function'
      },
    },
  },
  data() {
    // 在data函数中return回去的对象里边的属性都是响应式变量
    return {
      // 把Props传过来的值 当做子组件的初始值来用
      tle: this.title,
      sonTitle: '我是子组件定义的标题 sonTitle',
      isShow: false,
    }
  },
  methods: {
    editTitle() {
      // 不能直接修改 props的值
      // this.title = '修改后的值' // Unexpected mutation of "title" prop.
      // 可以修改被props的值初始化后的状态变量
      this.tle = '可以修改被props的值初始化后的状态变量';

      // 调用子组件传过来的函数
      this.propH(this.sonTitle, this.showHandler)
    },
    showHandler() {
      this.isShow = !this.isShow
    },
  },
  computed: {},
  mounted() {},
  watch: () => {}
}
</script>

<style lang="scss" scoped>
.isShowHide {
  height: 100px;
  width: 100px;
  background-color: cyan;
}
</style>
