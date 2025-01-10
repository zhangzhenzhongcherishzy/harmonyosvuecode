<!--
 Vue 3 中使用 axios 是一个常见的选择，用于处理 HTTP 请求。配置项分为全局配置和请求级别配置两种。以下是 axios 的配置项及其用法说明

!示例：
  import axios from 'axios';
  const axiosInstance = axios.create({
    baseURL: 'https://api.example.com', // 基础路径
    timeout: 5000, // 超时时间，单位毫秒
    headers: {
      'Content-Type': 'application/json', // 默认请求头
      Authorization: `Bearer YOUR_TOKEN`, // 示例令牌
    },
  });
  export default axiosInstance;

!常用配置项
1、baseURL：请求的基础 URL，所有请求都会以此为前缀。
2、url：请求的 URL，相对于 baseURL
3、method：HTTP 方法，常用值包括：GET、POST、PUT、DELETE、PATCH 等。
4、headers：自定义 HTTP 请求头
5、params：GET 请求的查询参数，最终会被拼接到 URL 中
  params: {
    id: 123,
    filter: 'active',
  },
6、data：请求体，用于 POST、PUT 等方法传递数据
  data: {
    name: 'John Doe',
    age: 30,
  },
7、timeout：请求超时时间（毫秒）
8、responseType：定义响应的数据类型
  json（默认）
  text
  blob
  document
  arraybuffer
9、withCredentials：跨域请求时是否携带凭据（如 Cookies）
  withCredentials: true,
10、auth：HTTP 基础认证
  auth: {
    username: 'admin',
    password: 'password123',
  },
11、validateStatus：自定义 HTTP 状态码验证逻辑
  validateStatus: (status) => {
  return status >= 200 && status < 300; // 默认值
  },
12、transformRequest 和 transformResponse：用于请求或响应数据的转换
  transformRequest: [(data, headers) => {
    // 对请求数据进行操作
    return JSON.stringify(data);
  }],
  transformResponse: [(data) => {
    // 对响应数据进行操作
    return JSON.parse(data);
  }],

!情景一：写在 axios.create 中的全局配置
  const axiosInstance = axios.create({
    baseURL: 'https://api.example.com', // 全局基础路径
    timeout: 5000,                     // 全局超时时间
    headers: {                         // 全局请求头
      'Content-Type': 'application/json',
      'Authorization': `Bearer DEFAULT_TOKEN`,
    },
    withCredentials: true,             // 是否跨域携带 Cookies
    responseType: 'json',              // 响应数据类型
    validateStatus: (status) => {      // 全局状态码验证逻辑
      return status >= 200 && status < 300;
    },
  });
适用场景：通用配置，如 baseURL、timeout、默认 headers 等，都建议写在 axios.create 中，这样可以避免重复配置。

!情景二：在具体请求中动态设置的配置：如果某些配置在请求时需要动态调整，比如 params、data 或某些特定的 headers，需要在请求调用时单独指定
  async function fetchUser(userId: number) {
    try {
      const response = await axiosInstance.get(`/users/${userId}`, {
        params: { includeDetails: true }, // 动态设置查询参数
        headers: {                        // 动态设置请求头
          'Custom-Header': 'CustomValue',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }

!分类总结:
?写在 axios.create 中的配置项
  baseURL
  timeout
  headers（全局默认值）
  withCredentials
  responseType
  validateStatus
  auth
  transformRequest
  transformResponse
?在具体请求中设置的配置项
  url：每个请求的路径
  method：请求方法（如果不是默认值 GET）
  params：GET 请求的查询参数
  data：POST、PUT 等请求的请求体数据
动态的 headers
-->
<template>
  <div id="wrap">
    <h1>axios封装TS版</h1>
    <div>
      <!-- 组件中使用 -->
      <button class="btn-id" @click="getRolePageHandler">角色分页列表</button>
      <button class="btn-id" @click="postRolesHandler">角色新增功能</button>
      <button class="btn-id" @click="puttRolesHandler">角色修改功能</button>
      <button class="btn-id" @click="deleteRolesHandler">角色删除功能</button>
      <button class="btn-id" @click="patchRolesHandler">角色禁用功能</button>
    </div>
    <div v-if="roles && roles.length > 0">
      <div v-for="item in roles" :key="item.id" class="box">
        <span>角色ID：{{ item.id }}</span>
        <span>角色名称:{{ item.name }}</span>
        <span>角色编码：{{ item.code }}</span>
        <span>排序：{{ item.sort }}</span>
        <span>角色状态：{{ item.status }}-正常</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'dayStuDemo61',
}
</script>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import {
  requestGetRolesPage,
  addRole,
  delRole,
  editRole,
  editRoleStaus,
  type RolesType,
} from '@/service/day20250109/StuDemo61'

//数据存放容器
const roles = ref<RolesType[]>([])

//get请求 角色列表
const getRolePageHandler = async () => {
  try {
    const res = await requestGetRolesPage({ pageNum: 1, pageSize: 100 })
    console.log(res.data)
    roles.value = res.data.list
  } catch (error) {
    console.error('获取角色分页数据失败:', error)
  }
}
//post请求
const postRolesHandler = async () => {
  const newRole = {
    name: '张振中11',
    code: '11',
    sort: 11,
    status: 1,
    dataScope: 3,
  }
  const res = await addRole(newRole)
  console.log(res.data)
  getRolePageHandler()
}
//PUT请求
const puttRolesHandler = () => {
  editRole('110038', {
    code: '999922',
    name: '修改的name',
    sort: 1,
    status: 1,
  })
  getRolePageHandler()
}
//DELETE请求
const deleteRolesHandler = async () => {
  delRole('110039')
  getRolePageHandler()
}
//PATCH请求
const patchRolesHandler = async () => {
  editRoleStaus('110038', 0)
  getRolePageHandler()
}

//组件挂载更新
onMounted(() => {
  getRolePageHandler()
})
</script>

<style lang="scss" scoped>
.btn-id {
  padding: 5px;
  font-weight: bold;

  font-size: 14px;
}
.box {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  span {
    margin: 10px;
    padding: 5px 10px;
    font-size: 14px;
    border-radius: 10px;
    border: 2px solid #409eff;
    background-color: #40e2ff;
  }
}
</style>
