<!--
Vue 3 的 TypeScript 环境中，组件间的传值主要通过 props 和 emit 实现

!props 基本用法：props 是父组件向子组件传递数据的方式。子组件通过 defineProps 接收父组件传递的数据
  1、普通传值： 在父组件中通过 v-bind 或直接绑定属性传递。
  2、动态数据： 可传递动态计算的变量或对象。
  3、函数： 通过父组件传递函数给子组件，子组件调用实现逻辑。

!Emit：子组件通过 $emit 触发自定义事件，父组件监听事件接收数据。
  用法：
    1、子组件定义 emit 事件，父组件通过 @事件名监听。
    2、可以传递多个参数

!props传值语法:
  父组件：使用属性绑定将数据传递给子组件
    1、使用 :（v-bind 的缩写）来绑定变量或动态值。
    2、静态字符串可以直接写，不需要:
  子组件：使用 defineProps 声明接收的 props
      const props = defineProps({
        myProp: {
          type: [String, Number],      配置项1：可接受多种类型
          required: true,              配置项2：是否为必传
          default: "默认值",            配置项3：默认值，支持函数
          todorawProps是Vue在调用 props 的 default 函数时传递的参数它包含了父组件传递给子组件的所有props的值
          default(rawProps:any) {
            console.log(rawProps, 'rawProps')
            return {
              name: '小度小度' + rawProps.title,
              sex: 1,
            }
          },

          validator: (value) => {      配置项4：自定义校验规则
            return value.length > 3; // 示例：字符串长度必须大于3
          },
        },
      });

!在 Vue 3 中，defineProps 是用来定义组件 props 的 Composition API 方法。两种写法：
  1、defineProps<{}>() 是使用 TypeScript 的泛型语法来定义 props 的类型
  2、defineProps({}) 是使用 JavaScript 对象语法直接定义 props

!区别：
  1、语法层面
    defineProps<{}>(): 利用了 TypeScript 的泛型，主要用于为 props 添加静态类型信息。它不会生成运行时验证代码，仅在编译时提供类型检查。
    defineProps({}): 接受一个对象作为参数，用于运行时定义 props，并可以添加默认值、类型验证等
  2、运行时 vs 编译时
    defineProps<{}>() 是纯 TypeScript 静态类型定义，不包含运行时的 prop 验证逻辑。
    defineProps({}) 提供运行时的 props 验证功能，比如通过 type 指定数据类型、required 指定是否为必填项等。

!使用场景：
  defineProps<{}>():在项目中完全依赖 TypeScript 进行类型检查时使用。
     示例：defineProps<{ name: string; age?: number }>();
  defineProps({}):需要运行时验证或对 props 提供默认值时使用。
     示例：
          defineProps({
            name: { type: String, required: true },
            age: { type: Number, default: 18 },
          });

!混合使用：如果需要运行时验证和 TypeScript 类型检查，可以结合两者
  const props = defineProps<{
    name: string;
    age?: number;
  }>({
    name: { type: String, required: true },
    age: { type: Number, default: 18 },
  });

!为什么用首字母大写
  defineProps 的 type 属性中的类型（如 String, Number, Boolean 等）是使用 JavaScript 构造函数 来定义的，而不是 TypeScript 的原始类型。这是因为 type 是在运行时用来验证 props 的，而不是静态类型检查的一部分

!背后的机制：Vue 在运行时会检查传入的 props 是否与 type 指定的构造函数的实例匹配
    String: 验证值是否是 typeof value === 'string'
    Number: 验证值是否是 typeof value === 'number'
    Boolean: 验证值是否是布尔值
    Array: 验证值是否是数组
    Object: 验证值是否是对象

!对比 TypeScript 类型和 JavaScript 构造函数
类型	                      用途	                        示例
string	      TypeScript 原始类型（静态检查）	      let name: string
String	      JavaScript 构造函数（运行时验证）	    { type: String }
number	      TypeScript 原始类型	                  let age: number
Number	      JavaScript 构造函数	                 { type: Number }

总结：在 defineProps 的 type 中使用首字母大写的 String、Number 等，是因为这些是 JavaScript 的构造函数，用于 Vue 的运行时验证。而小写的 string 和 number 是 TypeScript 的类型关键字，用于静态类型检查，两者作用不同，场景也不同

!什么是响应式解构:
  在 Vue 3 的早期版本中（如 3.0 到 3.4），通过 defineProps 定义的 props 是响应式的。但如果直接使用 解构赋值，会导致失去响应性。这是因为普通解构操作实际上从对象中提取了值，而不是保持对响应式对象的引用。示例如下：
    const props = defineProps<{ title: string; user: Iuser }>();
    todo普通解构
    const { title, user } = props;
    todo问题：title 和 user 不再是响应式的
?Vue 3.5 的改进:
  Vue 3.5 引入了 响应式解构赋值 的特性，使得通过 defineProps 解构后的值仍然具有响应性。这是通过 Vue 内部对解构操作的特殊处理实现的,示例如下：
    todo响应式解构赋值
    const {
      title = '默认标题',
      user,
      msg,
    } = defineProps<{
      title?: string;
      user: Iuser;
      msg?: string;
    }>();
?为什么叫“响应式 Props 解构”
  解构的方式：
    1、Vue 3.4 及以前：直接解构会丢失响应性。
    2、Vue 3.5+：解构后依然保持响应性。
  关键特性：
    Vue 3.5 通过优化，让直接解构 defineProps 不再破坏响应式系统，因此称为 响应式 Props 解构。

!Vue 3.5 之前的替代方案
const { title, user, msg } = toRefs(props);//这样解构后的 title、user 和 msg 仍然是响应式的
-->
<template>
  <div>
    <!-- 子组件SonDemo8 -->
    <SonDemo8 :user msg="躺尸七天"  @sonEmit="handleSonEmit"></SonDemo8>
    <hr />

    <!-- 子组件SonDemo9 -->
    <SonDemo9 v-for="item in userArr" :key="item.id" :user="item"></SonDemo9>
    <hr />
  </div>
</template>

<script lang="ts">
export default {
  name: 'dayStuDemo39',
}
</script>

<script lang="ts" setup>
import { ref } from 'vue'
import { type Iuser } from './components/SonDemo9.vue'
import SonDemo8 from './components/SonDemo8.vue'
import SonDemo9 from './components/SonDemo9.vue'

// 子组件SonDemo8
const user = ref<Iuser>({
  age: 16,
  name: '密密',
  sex: '女',
})
// 定义事件处理函数
function handleSonEmit(arg1: number, arg2: string, arg3: { name: string }) {
  console.log('子组件触发事件，参数如下:');
  console.log('参数 1:', arg1); // 数字 1
  console.log('参数 2:', arg2); // 字符串 "string"
  console.log('参数 3:', arg3); // 对象 { name: '小强' }
}

// 子组件SonDemo9
const userArr = ref<Iuser[]>([
  {
    id: 1,
    age: 16,
    name: '小明',
    sex: '男'
  },
  {
    id: 2,
    age: 18,
    name: '小红',
    sex: '女'
  },
  {
    id: 3,
    age: 19,
    name: '小绿',
    sex: '男'
  }
])
</script>

<style lang="scss"></style>
