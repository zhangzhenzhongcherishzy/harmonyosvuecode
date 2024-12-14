/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages" />

/*-------------端口号声明文件配置start------------*/
interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_CLI_PORT: number
  readonly VITE_SERVER_PORT: number
  readonly VITE_BASE_PATH: string
  readonly VITE_BASE_API: string
  readonly VITE_BASE_API2: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
/*-------------端口号声明文件配置end------------*/
/*-------------新增以vue文件结尾的文件声明文件配置start------------*/
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<
    Record<string, unknown>,
    Record<string, unknown>,
    Record<string, unknown>
  >
  export default component
}
/*-------------新增以vue文件结尾的文件声明文件配置end------------*/
/*-------------新增以jsx文件结尾的文件声明文件配置start------------*/
declare module '*.jsx' {
  import type { DefineComponent } from 'plugin-vue-jsx'
  const component: DefineComponent<
    Record<string, unknown>,
    Record<string, unknown>,
    Record<string, unknown>
  >
  export default component
}
/*-------------新增以jsx文件结尾的文件声明文件配置end------------*/
