import { ref,onMounted, onUnmounted } from "vue"



export function useEvent(target: any, event: any, callback: any) {
  // 一个组合式函数也可以挂靠在所属组件的生命周期上
  // 来启动和卸载副作用
  onMounted(() => target.addEventListener(event, callback))
  onUnmounted(() => target.removeEventListener(event, callback))
}


// export function useMouse() {
//   const x = ref(0)
//   const y = ref(0)
//   function update(event:any) {
//     x.value = event.pageX
//     y.value = event.pageY
//   }
//   onMounted(() => window.addEventListener('mousemove', update))
//   onUnmounted(() => window.removeEventListener('mousemove', update))
//   return { x, y }
// }
