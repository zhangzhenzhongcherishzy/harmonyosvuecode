<!--
$slots:$slots 是一个对象，表示当前组件中所有插槽的集合。它包含了父组件传递的所有插槽内容的信息

作用：
  1、检查是否有父组件提供了 header 插槽内容。
  2、如果有内容，渲染 <header> 标签和插槽内容。
  3、如果没有内容，<header> 不会被渲染。
-->
<template>
  <div>
    <headers v-if="$slots.header">
      <slot name="header"> header</slot>
    </headers>
    <main>
      <!-- 子组件的 slot 也提供了默认内容 main；默认内容仅在 父组件没有提供插槽内容时 使用-->
      <slot> main</slot>
    </main>
    <footer>
      <slot name="footer"> footer </slot>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
header {
  background-color: goldenrod;
}
</style>
