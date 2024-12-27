//第二种，方法独立封装
import { onMounted, onUnmounted } from 'vue';

//EventTarget 是 DOM 元素、文档、窗口等的通用接口

export function useEvent<T extends Event>(
  target: EventTarget,
  event: string,
  callback: (event: T) => void,
) {
  //一个组合式函数也可以挂靠在所属组件的生命周期上,启动和卸载副作用
  onMounted(() => target.addEventListener(event, callback as EventListener));
  onUnmounted(() => target.removeEventListener(event, callback as EventListener));
}
