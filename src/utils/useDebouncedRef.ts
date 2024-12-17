import { customRef } from 'vue'
//!自定义 ref 工具函数
//  防抖输入的实现
export function useDebouncedRef(value: unknown, delay = 200) {
  let timeout: ReturnType<typeof setTimeout>//timeout 的类型应该是 ReturnType<typeof setTimeout>，而不是直接 number。setTimeout 返回的类型在不同环境中有所不同，在浏览器环境下通常是 number，但为了确保类型安全，我们可以使用 ReturnType<typeof setTimeout> 来明确指定它的类型
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        console.log(newValue, 'newValue');

        clearTimeout(timeout)
        timeout = setTimeout(() => {
          console.log('修改执行');

          value = newValue
          trigger()
        }, delay)
      }
    }
  })
}
//格式化输入值 ：创建一个 ref，将用户输入自动转为大写。
export function useUpperCaseRef(initialValue: string) {
  return customRef((track, trigger) => {
    let value = initialValue

    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        value = newValue.toUpperCase()
        trigger()
      }
    }
  })
}
// 延迟更新:延迟一定时间更新值，用于节约性能消耗。
export function useDelayedRef(initialValue: string, delay = 1000) {
  return customRef((track, trigger) => {
    let value = initialValue

    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        setTimeout(() => {
          value = newValue
          trigger()
        }, delay)
      }
    }
  })
}
