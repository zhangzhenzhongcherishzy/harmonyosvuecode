import type { InjectionKey, Ref } from 'vue'

export const myInjectionKey = Symbol() as InjectionKey<{ heshibi: Ref<string> }>
/*
定义类型安全的键值 (InjectionKey)
  Symbol:
    1、是一个独一无二的值，作为 provide 和 inject 的键值，可以确保键不会冲突。
    2、使用 Symbol 是为了避免像字符串那样可能发生的键名重复问题。
  InjectionKey<T>:
    1、是 Vue 提供的一个泛型工具，用来定义 provide 和 inject 的键值的类型。
    2、T 是注入内容的类型。例如这里是 { heshibi: Ref<string> }。
    3、目的：确保 inject 时能够获得正确的类型提示和类型检查。
*/
