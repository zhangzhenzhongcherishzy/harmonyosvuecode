<script setup lang="ts">
import { defineExpose  } from 'vue'

// export type SonDemo22Instance = ComponentPublicInstance<{
//   childMethod: (arg: string) => void;
//   resetData: () => void;
// }>

const childMethod = (arg: string) => {
  console.log('子组件方法调用，参数为:', arg)
}
const resetData = () => {
  console.log('数据已重置')
}

/*
defineExpose 的用法 它允许我们 选择性地暴露 子组件的内部功能，而不是暴露整个实例。
1、子组件暴露了 resetData、resetData 方法，父组件通过引用调用此方法
2、避免了暴露整个组件实例，使子组件的 API 更加内聚和明确
*/
defineExpose({
  childMethod,
  resetData,
})
</script>
