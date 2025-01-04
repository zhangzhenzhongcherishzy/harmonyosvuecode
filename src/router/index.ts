/* eslint-disable @typescript-eslint/no-unused-vars */
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
//day20241211
import StuDemo1 from '@/views/day20241211/StuDemo1.vue'
import StuDemo2 from '@/views/day20241211/StuDemo2.vue'
import StuDemo3 from '@/views/day20241211/StuDemo3.vue'
// 定义路由表
const routesday20241211: Array<RouteRecordRaw> = [
  {
    path: '/StuDemo1',
    name: 'dayStuDemo1',
    component: () => import('@/views/day20241211/StuDemo1.vue'), // 按需加载
  },
  {
    path: '/StuDemo2',
    name: 'dayStuDemo2',
    component: () => import('@/views/day20241211/StuDemo2.vue'), // 按需加载
  },
  {
    path: '/StuDemo3',
    name: 'dayStuDemo3',
    component: () => import('@/views/day20241211/StuDemo3.vue'), // 按需加载
  },
]
//day20241212
import StuDemo4 from '@/views/day20241212/StuDemo4.vue'
import StuDemo5 from '@/views/day20241212/StuDemo5.jsx'
import StuDemo6 from '@/views/day20241212/StuDemo6.vue'
import StuDemo7 from '@/views/day20241212/StuDemo7.vue'
// 定义路由表
const routesday20241212: Array<RouteRecordRaw> = [
  {
    path: '/StuDemo4',
    name: 'dayStuDemo4',
    component: StuDemo4, // 按需加载
  },
  {
    path: '/StuDemo5',
    name: 'dayStuDemo5',
    component: StuDemo5, // 按需加载
  },
  {
    path: '/StuDemo6',
    name: 'dayStuDemo6',
    component: StuDemo6, // 按需加载
  },
  {
    path: '/StuDemo7',
    name: 'dayStuDemo7',
    component: StuDemo7, // 按需加载
  },
]
// day20241213
import StuDemo8 from '@/views/day20241213/StuDemo8.vue'
import StuDemo9 from '@/views/day20241213/StuDemo9.vue'
import StuDemo10 from '@/views/day20241213/StuDemo10.vue'
// 定义路由表
const routesday20241213: Array<RouteRecordRaw> = [
  {
    path: '/StuDemo8',
    name: 'dayStuDemo8',
    component: StuDemo8, // 按需加载
  },
  {
    path: '/StuDemo9',
    name: 'dayStuDemo9',
    component: StuDemo9, // 按需加载
  },
  {
    path: '/StuDemo10',
    name: 'dayStuDemo10',
    component: StuDemo10, // 按需加载
  },
]
// day20241214
import StuDemo11 from '@/views/day20241214/StuDemo11.vue'
import StuDemo12 from '@/views/day20241214/StuDemo12.vue'
const routesday20241214: Array<RouteRecordRaw> = [
  {
    path: '/StuDemo11',
    name: 'dayStuDemo11',
    component: StuDemo11, // 按需加载
  },
  {
    path: '/StuDemo12',
    name: 'dayStuDemo12',
    component: StuDemo12, // 按需加载
  },
]
// day20241216
import StuDemo13 from '@/views/day20241216/StuDemo13.vue'
import StuDemo14 from '@/views/day20241216/StuDemo14.vue'
import StuDemo15 from '@/views/day20241216/StuDemo15.vue'
import StuDemo16 from '@/views/day20241216/StuDemo16.vue'
const routesday20241216: Array<RouteRecordRaw> = [
  {
    path: '/StuDemo13',
    name: 'dayStuDemo13',
    component: StuDemo13, // 按需加载
  },
  {
    path: '/StuDemo14',
    name: 'dayStuDemo14',
    component: StuDemo14, // 按需加载
  },
  {
    path: '/StuDemo15',
    name: 'dayStuDemo15',
    component: StuDemo15, // 按需加载
  },
  {
    path: '/StuDemo16',
    name: 'dayStuDemo16',
    component: StuDemo16, // 按需加载
  },
]
// day20241217
import StuDemo17 from '@/views/day20241217/StuDemo17.vue'
import StuDemo18 from '@/views/day20241217/StuDemo18.vue'
import StuDemo19 from '@/views/day20241217/StuDemo19.vue'
import StuDemo20 from '@/views/day20241217/StuDemo20.vue'
const routesday20241217: Array<RouteRecordRaw> = [
  {
    path: '/StuDemo17',
    name: 'dayStuDemo17',
    component: StuDemo17, // 按需加载
  },
  {
    path: '/StuDemo18',
    name: 'dayStuDemo18',
    component: StuDemo18, // 按需加载
  },
  {
    path: '/StuDemo19',
    name: 'dayStuDemo19',
    component: StuDemo19, // 按需加载
  },
  {
    path: '/StuDemo20',
    name: 'dayStuDemo20',
    component: StuDemo20, // 按需加载
  },
]
// day20241218
import StuDemo21 from '@/views/day20241218/StuDemo21.vue'
import StuDemo22 from '@/views/day20241218/StuDemo22.vue'
import StuDemo23 from '@/views/day20241218/StuDemo23.vue'
import StuDemo24 from '@/views/day20241218/StuDemo24.vue'
import StuDemo25 from '@/views/day20241218/StuDemo25.vue'
const routesday20241218: Array<RouteRecordRaw> = [
  {
    path: '/StuDemo21',
    name: 'dayStuDemo21',
    component: StuDemo21, // 按需加载
  },
  {
    path: '/StuDemo22',
    name: 'dayStuDemo22',
    component: StuDemo22, // 按需加载
  },
  {
    path: '/StuDemo23',
    name: 'dayStuDemo23',
    component: StuDemo23, // 按需加载
  },
  {
    path: '/StuDemo24',
    name: 'dayStuDemo24',
    component: StuDemo24, // 按需加载
  },
  {
    path: '/StuDemo25',
    name: 'dayStuDemo25',
    component: StuDemo25, // 按需加载
  },
]
// day20241219
import StuDemo26 from '@/views/day20241219/StuDemo26.vue'
import StuDemo27 from '@/views/day20241219/StuDemo27.vue'
import StuDemo28 from '@/views/day20241219/StuDemo28.vue'
import StuDemo29 from '@/views/day20241219/StuDemo29.vue'
import StuDemo30 from '@/views/day20241219/StuDemo30.vue'
const routesday20241219: Array<RouteRecordRaw> = [
  {
    path: '/StuDemo26',
    name: 'dayStuDemo26',
    component: StuDemo26, // 按需加载
  },
  {
    path: '/StuDemo27',
    name: 'dayStuDemo27',
    component: StuDemo27, // 按需加载
  },
  {
    path: '/StuDemo28',
    name: 'dayStuDemo28',
    component: StuDemo28, // 按需加载
  },
  {
    path: '/StuDemo29',
    name: 'dayStuDemo29',
    component: StuDemo29, // 按需加载
  },
  {
    path: '/StuDemo30',
    name: 'dayStuDemo30',
    component: StuDemo30, // 按需加载
  },
]
// day20241220
import StuDemo31 from '@/views/day20241220/StuDemo31.vue'
import StuDemo32 from '@/views/day20241220/StuDemo32.vue'
import StuDemo33 from '@/views/day20241220/StuDemo33.vue'
import StuDemo34 from '@/views/day20241220/StuDemo34.vue'
import StuDemo35 from '@/views/day20241220/StuDemo35.vue'
const routesday20241220: Array<RouteRecordRaw> = [
  {
    path: '/StuDemo31',
    name: 'dayStuDemo31',
    component: StuDemo31, // 按需加载
  },
  {
    path: '/StuDemo32',
    name: 'dayStuDemo32',
    component: StuDemo32, // 按需加载
  },
  {
    path: '/StuDemo33',
    name: 'dayStuDemo33',
    component: StuDemo33, // 按需加载
  },
  {
    path: '/StuDemo34',
    name: 'dayStuDemo34',
    component: StuDemo34, // 按需加载
  },
  {
    path: '/StuDemo35',
    name: 'dayStuDemo35',
    component: StuDemo35, // 按需加载
  },
]
// day20241223
import StuDemo36 from '@/views/day20241223/StuDemo36.vue'
const routesday20241223: Array<RouteRecordRaw> = [
  {
    path: '/StuDemo36',
    name: 'dayStuDemo36',
    component: StuDemo36, // 按需加载
  },
]
// day20241224
import StuDemo37 from '@/views/day20241224/StuDemo37.vue'
import StuDemo38 from '@/views/day20241224/StuDemo38.vue'
const routesday20241224: Array<RouteRecordRaw> = [
  {
    path: '/StuDemo37',
    name: 'dayStuDemo37',
    component: StuDemo37, // 按需加载
  },
  {
    path: '/StuDemo38',
    name: 'dayStuDemo38',
    component: StuDemo38, // 按需加载
  },
]
// day20241225
import StuDemo39 from '@/views/day20241225/StuDemo39.vue'
import StuDemo40 from '@/views/day20241225/StuDemo40.vue'
import StuDemo41 from '@/views/day20241225/StuDemo41.vue'
const routesday20241225: Array<RouteRecordRaw> = [
  {
    path: '/StuDemo39',
    name: 'dayStuDemo39',
    component: StuDemo39, // 按需加载
  },
  {
    path: '/StuDemo40',
    name: 'dayStuDemo40',
    component: StuDemo40, // 按需加载
  },
  {
    path: '/StuDemo41',
    name: 'dayStuDemo41',
    component: StuDemo41, // 按需加载
  },
]
// day20241226
import StuDemo42 from '@/views/day20241226/StuDemo42.vue'
import StuDemo43 from '@/views/day20241226/StuDemo43.vue'
import StuDemo44 from '@/views/day20241226/StuDemo44.vue'
const routesday20241226: Array<RouteRecordRaw> = [
  {
    path: '/StuDemo42',
    name: 'dayStuDemo42',
    component: StuDemo42, // 按需加载
  },
  {
    path: '/StuDemo43',
    name: 'dayStuDemo43',
    component: StuDemo43, // 按需加载
  },
  {
    path: '/StuDemo44',
    name: 'dayStuDemo44',
    component: StuDemo44, // 按需加载
  },
]
// day20241227
import StuDemo45 from '@/views/day20241227/StuDemo45.vue'
import StuDemo46 from '@/views/day20241227/StuDemo46.vue'
const routesday20241227: Array<RouteRecordRaw> = [
  {
    path: '/StuDemo45',
    name: 'dayStuDemo45',
    component: StuDemo45, // 按需加载
  },
  {
    path: '/StuDemo46',
    name: 'dayStuDemo46',
    component: StuDemo46, // 按需加载
  },
]
// day20241230
import StuDemo47 from '@/views/day20241230/StuDemo47.vue'
import StuDemo48 from '@/views/day20241230/StuDemo48.vue'
import StuDemo49 from '@/views/day20241230/StuDemo49.vue'
import StuDemo50 from '@/views/day20241230/StuDemo50.vue'
const routesday20241230: Array<RouteRecordRaw> = [
  {
    path: '/StuDemo47',
    name: 'dayStuDemo47',
    component: StuDemo47, // 按需加载
  },
  {
    path: '/StuDemo48',
    name: 'dayStuDemo48',
    component: StuDemo48, // 按需加载
  },
  {
    path: '/StuDemo49',
    name: 'dayStuDemo49',
    component: StuDemo49, // 按需加载
  },
  {
    path: '/StuDemo50',
    name: 'dayStuDemo50',
    component: StuDemo50, // 按需加载
  },
]
// day20241231
import StuDemo51 from '@/views/day20241231/StuDemo51.vue'
const routesday20241231: Array<RouteRecordRaw> = [
  {
    path: '/StuDemo51',
    name: 'dayStuDemo51',
    component: StuDemo51, // 按需加载
  },
]
// day20250102
import StuDemo53 from '@/views/day20250102/StuDemo53.vue'
import StuDemo54 from '@/views/day20250102/StuDemo54.vue'
const routesday20250102: Array<RouteRecordRaw> = [
  {
    path: '/StuDemo53',
    name: 'dayStuDemo53',
    //子路由
    children: [
      {
        path: '/StuDemo53/',
        name: 'StuDemo53Son1',
        component: () => import('@/views/day20250102/components/StuDemo53Son1.vue'), // 按需加载
      },
      {
        path: '/StuDemo53/StuDemo53Son2',
        name: 'StuDemo53Son2',
        component: () => import('@/views/day20250102/components/StuDemo53Son2.vue'), // 按需加载
      },
    ],
    component: () => import('@/views/day20250102/StuDemo53.vue'), // 按需加载
  },
  {
    path: '/StuDemo54',
    name: 'dayStuDemo54',
    // 子路由与动态路由结合
    children: [
      {
        path: '/StuDemo54/:id',
        name: 'StuDemo54Son1',
        component: () => import('@/views/day20250102/components/StuDemo54Son1.vue'), // 按需加载
      },
    ],
    component: () => import('@/views/day20250102/StuDemo54.vue'), // 按需加载
  },
]
// day20250104
const routesday20250104: Array<RouteRecordRaw> = [
  {
    path: '/StuDemo55',
    name: 'dayStuDemo55',
    component: () => import('@/views/day20250104/StuDemo55.vue'), // 按需加载
    meta: { title: '我是路由元信息的标题' },
    children: [
      {
        path: '/StuDemo55/:id/:title/:content',
        name: 'StuDemo55Son1',
        component: () => import('@/views/day20250104/components/StuDemo55Son1.vue'), // 按需加载
        props:true
      },
    ],
  },
]

//配置主页
import HomeView from '@/views/HomeView.vue'
//配置登录页
import LoginView from '@/views/LoginView.vue'
//配置注册页
import RegisterView from '@/views/RegisterView.vue'
//管理路由表
export const routerList = [
  //配置主页
  {
    path: '/',
    name: 'HomeView',
    component: HomeView,
    meta: { title: '我是主页的标题', requiresAuth: true }, // 需要登录的路由
  },
  //配置登录页
  {
    path: '/LoginView',
    name: 'LoginView',
    component: LoginView,
    meta: { title: '我是登录页的标题' },
  },
  //配置注册页
  {
    path: '/RegisterView',
    name: 'RegisterView',
    component: RegisterView,
    meta: { title: '我是注册页的标题' },
  },
  ...routesday20241211,
  ...routesday20241212,
  ...routesday20241213,
  ...routesday20241214,
  ...routesday20241216,
  ...routesday20241217,
  ...routesday20241218,
  ...routesday20241219,
  ...routesday20241220,
  ...routesday20241223,
  ...routesday20241224,
  ...routesday20241225,
  ...routesday20241226,
  ...routesday20241227,
  ...routesday20241230,
  ...routesday20241231,
  ...routesday20250102,
  ...routesday20250104,
]
//注册路由
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routerList,
})

//全局路由守卫
// router.beforeEach((to, from, next) => {
//   const isAuthenticated = localStorage.getItem('token') === 'true'
//   if (to.meta.requiresAuth && isAuthenticated) {
//     alert('请先登录！')
//     next('/') // 未登录，跳转到登录页
//   } else {
//     next() // 不需要认证的路由直接放行
//   }
// })

// 自动路由配置
// import { createRouter, createWebHistory  } from 'vue-router'
// import { routes } from 'vue-router/auto-routes'
// const router = createRouter({
//   history: createWebHistory(),
//   routes: routes, // 使用自动生成的路由
// })
export default router
