import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
//导入使用jsx
import vueJsx from '@vitejs/plugin-vue-jsx'

import VueRouter from 'unplugin-vue-router/vite' //npm/cnpm/pnpm install -D unplugin-vue-router

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({
      routesFolder: [
        'src/views/day20241211',
        'src/views/day20241212',
        'src/views/day20241213',
        'src/views/day20241214',
        'src/views/day20241216',
        'src/views/day20241217',
        'src/views/day20241218',
        'src/views/day20241219',
        'src/views/day20241220',
      ], // 指定路由文件所在的目录
      // routesFolder: 'src/views', // 指定路由文件所在的目录
      extensions: ['.vue', '.jsx'],
    }),
    vue(),
    vueJsx(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  /*-----------------------------------------配置使用vite加载scss文件(全局)---------------------------------------------- */
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       // 使用vite加载scss文件
  //       additionalData: `
  //       @use "@/styles/index.scss" as *;
  //       `,
  //       api: 'modern-compiler',
  //     },
  //   },
  // },
  /*-----------------------------------------配置使用vite加载scss文件结束---------------------------------------------- */
  /*-----------------------------------------配置打包服务开始---------------------------------------------- */
  build: {
    target: 'es2017',
    minify: 'terser', // 是否进行压缩,boolean | 'terser' | 'esbuild',默认使用terser
    manifest: false, // 是否产出manifest.json
    sourcemap: false, // 是否产出sourcemap.json
    outDir: 'dist', // 产出目录
  },
  /*-----------------------------------------配置打包服务结束---------------------------------------------- */
  /*-----------------------------------------配置启动服务开始，热更新---------------------------------------------- */
  server: {
    // 如果使用docker-compose开发模式，设置为false
    open: true,
    port: Number(process.env.VITE_CLI_PORT),
    proxy: {
      // 把key的路径代理到target位置
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      // :${process.env.VITE_SERVER_PORT}
      [process.env.VITE_BASE_API as string]: {
        // 需要代理的路径   例如 '/api'
        // target: `http://10.10.10.181:8866`, // 代理到 目标路径
        target: `${process.env.VITE_BASE_PATH}`,
        changeOrigin: true,
        rewrite: (path) => path.replace(new RegExp('^' + process.env.VITE_BASE_API), ''),
      },
      '/sse': {
        // 需要代理的路径   例如 '/api'
        // target: `http://10.10.7.222:8866`, // 代理到 目标路径
        target: `${process.env.VITE_BASE_PATH}`,
        changeOrigin: true,
        rewrite: (path) => path.replace(new RegExp('^/sse'), ''),
      },
    },
  },
  /*-----------------------------------------配置启动服务结束，热更新---------------------------------------------- */
})
