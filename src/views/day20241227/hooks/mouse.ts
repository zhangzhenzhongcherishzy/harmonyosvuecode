//第二种，方法独立封装
import { ref, reactive, toRefs, toValue, watch } from 'vue';
import { useEvent } from './event';
// 按照惯例，组合式函数名以“use”开头
export function useMouse(val: string | number | (() => string | number)) {
  // 被组合式函数封装和管理的状态
  const x = ref<number>(0);
  const y = ref<number>(0);

  // 鼠标移动更新函数
  function update(event: MouseEvent): void {
    x.value = event.pageX;
    y.value = event.pageY;
  }

  // 响应式对象
  const state = reactive({
    foo: 1, // 数字类型
    bar: '2', // 字符串类型
  });

  // 监听传入值的变化
  watch(
    () => toValue(val),
    (newVal: string | number) => {
      if (typeof newVal === 'number') {
        // newVal 是 number，可以进行加法
        console.log(newVal + x.value, 'newVal');
        state.bar = `${newVal}state.bar`;
      } else {
        // newVal 是 string，拼接字符串
        console.log(newVal, 'newVal');
        state.bar = `${newVal}state.bar`;
      }
    },
  );

  // 注册事件监听
  useEvent(window, 'mousemove', update);

  // 返回状态
  return { x, y, ...toRefs(state) };
}

//第一个的组合式函数写法，记录鼠标移动坐标的方法
// import { ref , onMounted,onUnmounted} from 'vue'
// export function useMouse(){
//   const x = ref(0)
//   const y = ref(0)
//   function updata(event:MouseEvent){
//     x.value = event.pageX
//     y.value = event.pageY
//   }
//   onMounted(() => window.addEventListener('mousemove',updata as EventListener))
//   onUnmounted(() => window.removeEventListener('mousemove',updata as EventListener))
//   return {x,y}
// }
