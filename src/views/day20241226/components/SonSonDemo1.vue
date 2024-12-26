<template>
  <div>
    <h1>我是孙子组件</h1>
    <!-- !渲染SonDemo17传递的props.chide -->
    <div>{{ props.chide2 }}</div>
    <hr />

    <!-- !渲染跨层级传递数据 -->
    <div>爷爷的传家宝 ：{{ heshibi }}</div>
    <div>爷爷的传家宝 ：{{ foo?.name }}</div>
  </div>
</template>

<script setup lang="ts">
import { inject, type Ref } from 'vue'
import { myInjectionKey } from './keys'

/**********************************接受SonDemo17传递的props.chide*************************************/
const props = defineProps<{
  chide2: string
}>()

/**********************************跨层级传递数据*************************************/
const { heshibi } = inject(myInjectionKey) as {
  heshibi: Ref<string>
}
const foo = inject<{ name: string }>('foo')
</script>
