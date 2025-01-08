<!--
!组件中使用：
1、npm/cnpm/pnpm  install axios   ||  yarn add axios
2、import axios from 'axios'
3、语法：
  ?写法1
   axios({
     method: 'GET',
     url: 'http://localhost:8989/roles/page?pageNum=1&pageSize=10',
   }).then((res) => {
     console.log(res)
     roles.value = res.data.data.list
   })
  ?简写
  axios.get('http://localhost:8989/roles/page?pageNum=1&pageSize=10').then((res) => {
    console.log(res)
    roles.value = res.data.data.list
  })
!全局中使用：
?main配置
  1、全局中使用axios
    import axios from 'axios';
  2、将axios挂载到全局
    app.config.globalProperties.$axios = axios
  3、提供全局 axios
    app.provide('$axios', axios);
?组件中使用
  1、全局使用所需依赖
    import { inject } from 'vue'
    import type { AxiosInstance } from 'axios'
  2、组件中使用
    const getRolePageHandler1 = async () => {
      if (!$axios) {
        console.error('Axios is not available.')
        return
      }
      try {
        const res = await $axios.get('http://localhost:8989/roles/page?pageNum=1&pageSize=10')
        roles.value = res.data.data.list
      } catch (error) {
        console.error('Error fetching roles:', error)
      }
    }

    //post请求
    const postRolesHandler1 = async () => {
      const newRole = {
        name: '系统管理员31',
        code: 'ADMIN11',
        sort: 3,
        status: 1,
        dataScope: 3,
      }
      if (!$axios) {
        console.error('Axios is not available.')
        return
      }
      try {
        const res = await $axios.post('http://localhost:8989/roles', JSON.stringify(newRole))
        console.log('New role created:', res.data)
      } catch (error) {
        console.error('Error creating role:', error)
      }
    }
-->
<template>
  <div id="wrap">
    <h1>axios 安装和使用</h1>
    <div>
      <!-- 组件中使用 -->
      <button @click="getRolePageHandler">角色分页列表</button>
      <button @click="postRolesHandler">角色新增功能</button>

      <!-- 全局中使用 -->
      <button @click="getRolePageHandler1">角色分页列表</button>
      <button @click="postRolesHandler1">角色新增功能</button>
    </div>
    <div v-if="roles && roles.length > 0">
      <div v-for="item in roles" :key="item.id" class="box">
        <span>角色ID：{{ item.id }}</span>
        <span>角色名称:{{ item.name }}</span>
        <span>角色编码：{{ item.code }}</span>
        <span>排序：{{ item.sort }}</span>
        <!-- (1-正常；0-停用) -->
        <span>角色状态：{{ item.status }}-正常</span>
        <!-- (0:全部数据,1:部门及子部门数据,2:本部门数据,3:本人数据) -->
        <!-- <span>{{ item.dataScope }}</span> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'dayStuDemo59',
}
</script>

<script lang="ts" setup>
import axios from 'axios'
import { ref } from 'vue'

//全局使用所需依赖
import { inject } from 'vue'
import type { AxiosInstance } from 'axios'
// 从全局注入 axios
const $axios = inject<AxiosInstance>('$axios')

interface Role {
  id: number
  name: string
  code: string
  sort: number
  status: number // 确保定义了status属性
  // dataScope?: number; // 如果有可选的属性，使用可选链?
}
const roles = ref<Role[]>([])

//组件中使用

//get请求
const getRolePageHandler = () => {
  //写法1
  // axios({
  //   method: 'GET',
  //   url: 'http://localhost:8989/roles/page?pageNum=1&pageSize=10',
  // }).then((res) => {
  //   console.log(res)
  //   roles.value = res.data.data.list
  // })
  //简写
  axios.get('http://localhost:8989/roles/page?pageNum=1&pageSize=10').then((res) => {
    console.log(res)
    roles.value = res.data.data.list
  })
}

//post请求
const postRolesHandler = () => {
  const newRole = {
    name: '系统管理员31',
    code: 'ADMIN11',
    sort: 3,
    status: 1,
    dataScope: 3,
  }
  //写法1
  // axios({
  //   method: 'POST',
  //   url: 'http://localhost:8989/roles',
  //   data: JSON.stringify(newRole),
  // }).then((res) => {
  //   console.log(res.data)
  // })
  //简写
  axios.post('http://localhost:8989/roles', JSON.stringify(newRole)).then((res) => {
    console.log(res.data)
  })
}

//全局中使用
//get请求
const getRolePageHandler1 = async () => {
  if (!$axios) {
    console.error('Axios is not available.')
    return
  }
  try {
    const res = await $axios.get('http://localhost:8989/roles/page?pageNum=1&pageSize=10')
    roles.value = res.data.data.list
  } catch (error) {
    console.error('Error fetching roles:', error)
  }
}

//post请求
const postRolesHandler1 = async () => {
  const newRole = {
    name: '系统管理员31',
    code: 'ADMIN11',
    sort: 3,
    status: 1,
    dataScope: 3,
  }
  if (!$axios) {
    console.error('Axios is not available.')
    return
  }
  try {
    const res = await $axios.post('http://localhost:8989/roles', JSON.stringify(newRole))
    console.log('New role created:', res.data)
  } catch (error) {
    console.error('Error creating role:', error)
  }
}
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  span {
    margin: 10px;
    padding: 10px;
    border-radius: 10px;
    border: 2px solid #409eff;
    background-color: #40e2ff;
  }
}
</style>
