import axios, { type InternalAxiosRequestConfig, type AxiosError, type AxiosRequestConfig } from "axios"

interface AxiosRequestConfigEx extends AxiosRequestConfig {
  donNotShowLoading?: boolean
}

export type ResType<T = unknown> = {
  code: string;
  data: T;
  msg: string;
}

export type PageDataType<T> = {
  list: T[];
  pageNum: number;
  pageSize: number;
  total: number;
}

export type RolesType = {
  code: string;
  createTime?: string;
  id?: number;
  name: string;
  sort: number;
  status: number;
}

const instance = axios.create({
  // 基本的url地址
  baseURL: import.meta.env.VITE_BASE_PATH,
  // 超时时间
  timeout: 2000
})


// http request 拦截器
instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {

  // 使用 set 方法来设置 headers
  config.headers.set('Content-Type', 'application/json');
  // return {
  //   ...config,
  //   headers: {
  //     'x-access-token': '', // 请求头中携带token信息
  //   }
  // }

  return config
},
  (error: AxiosError) => {
    // 请求报错
    Promise.reject(error)
  })


instance.interceptors.response.use(
  response => {
    // 响应成功时做一些处理
    console.log('响应拦截器: ', response);
    return response;
  },
  error => {
    // 统一处理错误信息
    if (error.response.status === 401) {
      // 如果是 401 错误，可能是未授权，跳转到登录页面
      window.location.href = '/login';
    } else if (error.response.status === 500) {
      // 服务器错误
      console.error('服务器错误');
    }

    return Promise.reject(error);
  }
);




// 服务请求
export const service = <T = unknown>(config: AxiosRequestConfigEx) => {

  return instance.request<ResType<T>>(config)
    .then(response => { return response.data })
  // .catch(error => console.error(error));
}




// 角色分页列表
export const requestGetRolesPage = (params: unknown) => {

  return service<PageDataType<RolesType>>({
    method: 'get',      // 指定请求方法
    url: '/roles/page',         // 请求的 URL
    params,    // 查询参数,
  })

  // return instance.request<ResType<PageDataType<RolesType>>>({
  //   method: 'get',         // 指定请求方法
  //   url: '/roles/page',         // 请求的 URL
  //   params    // 查询参数
  // })
  //   .then(response => { return response.data })
  // .catch(error => console.error(error));
}

const requestGetRolesPageHandler3 = async () => {
  const res = await requestGetRolesPage({ pageNum: 1, pageSize: 40 })
  console.log(res)
  // roles.value = res.data.list
}


/**
 * 添加角色
 * @param data
 * @returns
 */
export const addRole = (data: unknown) => {


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
export const editRole = (roleId: string, data: RolesType) => {


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




export const editRoleStaus = (roleId: string, status: number) => {

  return service({
    method: 'patch',
    url: `/roles/${roleId}/status`,
    params: { status }
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

  instance.request({
    method: 'delete',
    url: `/roles/${ids}`,
  })
    .then(response => console.log('Deleted:', response.data))
    .catch(error => console.error(error));

}
