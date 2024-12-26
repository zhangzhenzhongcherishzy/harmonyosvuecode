<!--
!插槽 (Slot) ：
   Vue 组件中用于父组件向子组件传递可重用内容的占位符。通过插槽机制，父组件可以动态地向子组件传递结构化内容，子组件可以在其模板中定义插槽的位置和用途。

!插槽的核心思想是：
  父组件决定内容，子组件决定布局和结构。

!插槽的作用
  1、提高组件的复用性：允许一个组件在不同的上下文中显示不同的内容。
  2、灵活的内容传递：父组件可以控制具体的内容，子组件仅需要定义内容的插入位置。
  3、解耦组件结构和内容：子组件专注于逻辑和样式，父组件专注于内容提供。

!简单理解插槽的比喻
  将插槽理解为一个“插座”，子组件预留了一个插座，父组件可以根据需要插入“插头”（即具体的内容）。子组件负责供电（定义逻辑和布局），而父组件负责提供插头（动态内容）。

!插槽的核心原理
  ?1、子组件定义插槽位置：
    使用 <slot> 标签或 <slot name="customName"> 在子组件中标记插槽位置。
  ?2、父组件提供内容：
    父组件在子组件标签中嵌套内容，内容会根据插槽的配置渲染到子组件定义的位置。

!基础插槽（Default Slot）:基础插槽是默认插槽，用于在子组件中显示未命名的内容。
  1、子组件使用 <slot> 标签定义插槽位置。
  2、父组件传递的内容将会替代 <slot> 标签。

!具名插槽（Named Slots）：具名插槽允许为多个插槽命名，便于在子组件中定义多个内容区域。
  1、子组件通过 name 属性定义插槽，如 <slot name="header">。
  2、父组件使用 v-slot:插槽名 绑定对应内容。
  3、可以省略 v-slot:，如 <template #header>。

!作用域插槽（Scoped Slots）：作用域插槽允许子组件向父组件传递数据，并由父组件决定如何渲染内容。
  1、子组件通过 :propName="value" 的形式向插槽传递数据。
  2、父组件通过 v-slot="slotProps" 接收数据，并通过 slotProps 使用。

!动态插槽名称：插槽名称可以动态绑定。
  1、使用 v-slot:[dynamicName] 语法绑定动态名称。
  2、动态名称必须是有效的变量或表达式

!插槽的默认内容:插槽可以设置默认内容，在父组件不传递内容时显示默认值。
  1、如果父组件未传递内容，子组件会显示 <slot> 标签内部的默认内容。

!总结:
  1、默认插槽。
  2、具名插槽。
  3、作用域插槽。
  4、动态插槽名称。
  5、插槽默认内容。

-->
<template>
  <div id="wrap">
    <h1>组件事件emit</h1>
    <SonDemo13>
      <!-- 基础插槽 -->
      <!-- <p>这是插槽内容</p> -->

      <!-- 具名插槽（Named Slots） -->
      <template v-slot:header>
        <h1>这是头部内容</h1>
      </template>
      <template v-slot:footer>
        <p>这是尾部内容</p>
      </template>

      <!-- 作用域插槽（Scoped Slots） -->
      <template v-slot:default="slotProps">
        <div>子组件传来的数据：{{ slotProps.message }}</div>
      </template>

      <!-- 动态插槽名称 -->
      <template v-slot:[dynamicSlotName]>
        <p>这是动态插槽内容</p>
      </template>

      <!-- 插槽可以设置默认内容 -->
      <template v-slot:abc>
        <!-- <h1>这是头部内容</h1> -->
      </template>
    </SonDemo13>
  </div>
</template>

<script lang="ts" setup>
import SonDemo13 from './components/SonDemo13.vue'
import { ref } from 'vue';
//动态插槽名称
const  dynamicSlotName = ref('dynamicSlotName')
</script>
