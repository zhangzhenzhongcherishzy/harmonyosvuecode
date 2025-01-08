// import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios' // 引入axios




// // 泛型接口,T的类型支持
// export interface IResponseData<T = any> {
//   code: number
//   msg: string
//   data: T
// }


// const instance: AxiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_BASE_PATH,
//   timeout: 2000
// });



// // http request 拦截器
// instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {

//   // 使用 set 方法来设置 headers
//   config.headers.set('Content-Type', 'application/json');
//   config.headers.set('x-token', 'token-1');

//   return config
// })

// export const res12 = () => {
//   return instance.get('/api/user', {
//     params: {
//       id: 1
//     }
//   })
// }


