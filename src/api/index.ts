import axios from '../utils/request'
import path from './path'

interface Role {
  name: string
  code: string
  sort: number
  status: number // 确保定义了status属性
  // dataScope?: number; // 如果有可选的属性，使用可选链?
}

const api = {
  //完整地址请求
  getFinish() {
    return axios.get(path.baseUrl + path.getfinish)
  },
  postRoles(data:Role) {
    return axios.post(path.baseUrl + path.postUrl,data)
  },
}
export default api
