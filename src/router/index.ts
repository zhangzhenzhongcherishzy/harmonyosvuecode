import { createRouter, createWebHistory } from 'vue-router'

import { routes } from 'vue-router/auto-routes'

const router = createRouter({
  history: createWebHistory(),
  routes: routes, // 使用自动生成的路由
})

// //day1211StuDemo1页面导入
// import StuDemo1 from '@/views/day20241211/StuDemo1.vue'
// //day1211StuDemo2页面导入
// import StuDemo2 from '@/views/day20241211/StuDemo2.vue'
// //day1211StuDemo3页面导入
// import StuDemo3 from '@/views/day20241211/StuDemo3.vue'
// //day1212StuDemo4页面导入
// import StuDemo4 from '@/views/day20241212/StuDemo4.vue'
// //day1212StuDemo4页面导入
// import StuDemo5 from '@/views/day20241212/StuDemo5.jsx'
// //day1212StuDemo4页面导入
// import StuDemo6 from '@/views/day20241212/StuDemo6.vue'
// //day1212StuDemo4页面导入
// import StuDemo7 from '@/views/day20241212/StuDemo7.vue'
// //注册路由
// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: [
//     {
//       path: '/',
//       name: 'dayStuDemo1',
//       component: StuDemo1,
//     },
//     {
//       path: '/StuDemo2',
//       name: 'dayStuDemo2',
//       component: StuDemo2,
//     },
//     {
//       path: '/StuDemo3',
//       name: 'dayStuDemo3',
//       component: StuDemo3,
//     },
//     {
//       path: '/StuDemo4',
//       name: 'dayStuDemo4',
//       component: StuDemo4,
//     },
//     {
//       path: '/StuDemo5',
//       name: 'dayStuDemo5',
//       component: StuDemo5,
//     },
//     {
//       path: '/StuDemo6',
//       name: 'dayStuDemo6',
//       component: StuDemo6,
//     },
//     {
//       path: '/StuDemo7',
//       name: 'dayStuDemo7',
//       component: StuDemo7,
//     },
//   ],
// })
export default router
