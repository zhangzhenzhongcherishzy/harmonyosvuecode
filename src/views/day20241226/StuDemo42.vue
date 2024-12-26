<!--
!1、v-slot 是 Vue 3 提供的标准指令，用于绑定插槽
!2、#是 v-slot 的简写形式，常用在模版中
  v-slot:header 等价于 #header。
  v-slot:[dynamicSlotName] 等价于 #[dynamicSlotName]
!3、#default 表示为默认插槽提供内容（子组件没有 name 的插槽）
-->
<template>
  <div id="wrap">
    <h1>插槽Slot演示</h1>
    <!-- !SonDemo13:根据 isZhendao 的值，动态渲染不同内容-->
    <div class="group">
      <SonDemo13 class="group3" :is-zhendao="4"></SonDemo13>
    </div>

    <!-- !SonDemo14:使用默认插槽展示父组件传入的内容，支持嵌套组件-->
    <div class="group">
      <SonDemo14></SonDemo14>
      <SonDemo14 class="group3">
        <!--  ?渲染作用域:插槽内容可以访问到父组件的数据作用域，因为插槽内容本身是在父组件模板中定义的 -->
        <button @click="() => num1++">{{ num1 }}</button>
        <!-- ?还可以放入其他子组件 -->
        <SonDemo13 class="group3" :is-zhendao="2"></SonDemo13>
      </SonDemo14>
    </div>

    <!--!SonDemo15:支持具名插槽和动态具名插槽，适合用于布局复杂的内容-->
    <div class="group">
      <SonDemo15>
        <template #header>
          <div>new header</div>
        </template>

        <template #default>
          <!--?#default 表示为默认插槽提供内容（子组件没有 name 的插槽）： 父组件的默认值 -->
          <div>new main</div>
        </template>

        <template #footer>
          <div>new footer</div>
        </template>
      </SonDemo15>
      <!-- ?动态具名插槽： -->
      <SonDemo15>
        <template #[dynamicSlotName]> 我是一块砖 </template>
        <button type="button" @click="editDynamicSlotName">修改动态具名插槽</button>
      </SonDemo15>
    </div>

    <!--!SonDemo16:使用作用域插槽，将子组件的 msg 和 title 数据暴露给父组件动态使用-->
    <div class="group">
      <SonDemo16>
        <template #default="{ msg: smsg }">
          <div>new main {{ smsg }}</div>
        </template>

        <template #header="{ title }">
          <div>new header {{ title }}</div>
        </template>

        <template #footer>
          <div>new footer</div>
        </template>
      </SonDemo16>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'dayStuDemo42',
}
</script>

<script lang="ts" setup>
import { ref } from 'vue'
import SonDemo13 from './components/SonDemo13.vue'
import SonDemo14 from './components/SonDemo14.vue'
import SonDemo15 from './components/SonDemo15.vue'
import SonDemo16 from './components/SonDemo16.vue'

// SonDemo14 响应式变量
const num1 = ref(1)

// SonDemo15 动态具名插槽的名称
const dynamicSlotName = ref('')
const editDynamicSlotName = () => {
  dynamicSlotName.value = 'header'
}
</script>

<style lang="scss">
.group {
  border: 3px solid rgb(37, 114, 192);
  margin: 10px;
  padding: 10px;
}

.group3 {
  border: 2px solid rgb(199, 64, 147);
  margin: 10px;
  padding: 10px;
}
</style>
