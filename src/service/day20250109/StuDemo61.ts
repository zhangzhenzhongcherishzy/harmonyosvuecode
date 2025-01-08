//!导入所需模块
import axios, {
  type InternalAxiosRequestConfig, //内部请求配置类型（axios 提供）
  type AxiosError, //定义 axios 请求错误类型
  type AxiosRequestConfig, //axios 请求配置的标准类型
} from 'axios'
//!扩展配置项: 为 AxiosRequestConfig 增加 donNotShowLoading 字段，用于控制是否显示加载提示。
interface AxiosRequestConfigEx extends AxiosRequestConfig {
  donNotShowLoading?: boolean
}
//!ResType: 通用返回格式，包含 code（状态码）、data（数据体）和 msg（消息）
export type ResType<T = unknown> = {
  code: string
  data: T
  msg: string
}
//!PageDataType: 用于分页数据类型，例如：列表、分页信息
export type PageDataType<T> = {
  list: T[]
  pageNum: number
  pageSize: number
  total: number
}
//!RolesType: 定义角色实体字段，例如 id、name、status 等
export type RolesType = {
  code: string
  createTime?: string
  id?: number
  name: string
  sort: number
  status: number
}
//!创建 Axios 实例
const instance = axios.create({
  //baseURL: 基础 URL，使用本地localhost。
  baseURL: 'http://localhost:8989',
  //请求超时时间，单位毫秒
  timeout: 2000,
})

//!http request 请求拦截器----request.use: 请求前的拦截逻辑
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    //设置请求头
    config.headers.set('Content-Type', 'application/json')
    return config
  },
  (error: AxiosError) => {
    //如果请求配置发生错误，将错误抛出
    Promise.reject(error)
  },
)
//!http response 响应拦截器----response.use: 响应后的拦截逻辑
instance.interceptors.response.use(
  (response) => {
    // 响应成功时做一些处理
    // console.log('响应拦截器: ', response)
    return response
  },
  (error) => {
    // 统一处理错误信息
    if (error.response.status === 401) {
      // 如果是 401 错误，可能是未授权，跳转到登录页面
      window.location.href = '/LoginView'
    } else if (error.response.status === 500) {
      // 服务器错误
      console.error('服务器错误')
    }
    return Promise.reject(error)
  },
)

// 服务请求
export const service = <T = unknown>(config: AxiosRequestConfigEx):Promise<ResType<T>> => {
  //instance.request: 使用 axios 的实例方法发送请求
  return instance
    .request<ResType<T>>(config)
    .then((response) => {
      //response.data: 返回解析后的数据体
      return response.data
    })
    .catch((error) => {
      console.error(error)
      throw error
    })
}

interface GetRolesPageParams {
  pageNum: number
  pageSize: number
}
// 角色分页列表
export const requestGetRolesPage = (params: GetRolesPageParams) => {
  return service<PageDataType<RolesType>>({
    method: 'get', // 指定请求方法
    url: '/roles/page', // 请求的 URL
    params, // 查询参数,
  })

  // return instance.request<ResType<PageDataType<RolesType>>>({
  //   method: 'get',         // 指定请求方法
  //   url: '/roles/page',         // 请求的 URL
  //   params    // 查询参数
  // })
  //   .then(response => { return response.data })
  // .catch(error => console.error(error));
}

//调用 requestGetRolesPage 查询第一页角色，每页 40 条，打印结果
// const requestGetRolesPageHandler3 = async () => {
//   const res = await requestGetRolesPage({ pageNum: 1, pageSize: 100 })
//   console.log(res)
//   // roles.value = res.data.list
// }

/**
 * 添加角色 @param data
 * @returns
 * 优化any类型报错问题：addRole 方法需要添加具体的类型。根据代码逻辑，data 是 RolesType 的一种形式，可以扩展定义一个接口；Omit 工具类型用于排除不需要的字段（如 id 和 createTime），因为新增时通常不传这些字段。
 */
export const addRole = (data: Omit<RolesType, 'id' | 'createTime'>) => {
  return service({
    method: 'post',
    url: '/roles',
    data,
  })
  // return instance.request<ResType>({
  //   method: 'post',
  //   url: '/roles',
  //   data,
  // })
  // .then(response => console.log(response.data))
  // .catch(error => console.error(error));
}

/**
 * 修改角色的数据
 * @param data
 * @returns
 */
export const editRole = (roleId: string, data: Partial<RolesType>) => {
  service({
    method: 'put',
    url: `/roles/${roleId}`,
    data,
  })

  // return instance.request<ResType>({
  //   method: 'put',
  //   url: `/roles/${roleId}`,
  //   data,
  // })
  //   .then(response => console.log(response.data))
  //   .catch(error => console.error(error));
}

/**
 * 修改角色的状态
 * @param data
 * @returns
 */
export const editRoleStaus = (roleId: string, status: number) => {
  return service({
    method: 'patch',
    url: `/roles/${roleId}/status`,
    params: { status },
  })
  // return instance.request<ResType>({
  //   method: 'patch',
  //   url: `/roles/${roleId}/status`,
  //   params: { status }
  // })
  //   .then(response => console.log(response.data))
  //   .catch(error => console.error(error));
}

/**
 * 删除角色
 * @param ids
 */
export const delRole = (ids: string) => {
  instance
    .request({
      method: 'delete',
      url: `/roles/${ids}`,
    })
    .then((response) => console.log('Deleted:', response.data))
    .catch((error) => console.error(error))
}
