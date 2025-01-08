import axios, {
  type InternalAxiosRequestConfig,
  type AxiosError,
  type AxiosRequestConfig,
} from 'axios'

interface AxiosRequestConfigEx extends AxiosRequestConfig {
  donNotShowLoading?: boolean
}

//网络请求的公共配置
const instance = axios.create({
  // 基本的url地址
  baseURL: 'http://localhost:8989',
  // 超时时间
  timeout: 2000,
})

//拦截器1：发送网络请求之前
instance.interceptors.request.use(
  //成功的函数
  (config: InternalAxiosRequestConfig) => {
    // 使用 set 方法来设置 headers
    config.headers.set('Content-Type', 'application/json')
    if(config.method == 'post'){
      config.data  = JSON.stringify(config.data)
    }
    // return {
    //   ...config,
    //   headers: {
    //     'x-access-token': '', // 请求头中携带token信息
    //   }
    // }

    return config
  },
  //失败的函数
  (error: AxiosError) => {
    // 请求报错
    return Promise.reject(error)
  },
)
//拦截器2：获取数据之前
instance.interceptors.response.use(
  (response) => {
    // 响应成功时做一些处理
    console.log('响应拦截器: ', response)
    return response.status == 200 ? Promise.resolve(response) : Promise.reject(response)
  },
  (error) => {
    // 统一处理错误信息
    if (error.response.status === 401) {
      // 如果是 401 错误，可能是未授权，跳转到登录页面
      window.location.href = '/login'
    } else if (error.response.status === 500) {
      // 服务器错误
      console.error('服务器错误')
    }
    return Promise.reject(error)
  },
)
