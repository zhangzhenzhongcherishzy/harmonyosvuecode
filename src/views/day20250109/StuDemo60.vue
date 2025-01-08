<template>
  <div id="wrap">
    <h1>axios的封装</h1>
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
  name: 'dayStuDemo60',
}
</script>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import api from '@/api/index'
interface Role {
  id: number
  name: string
  code: string
  sort: number
  status: number
}
const roles = ref<Role[]>([])
//get请求
const getRolePageHandler = () => {
  api.getFinish().then((res: any) => {
    console.log(res.data)
    roles.value = res.data.data.list
  })
}
//post请求
const postRolesHandler = () => {
  const newRole = {
    name: '系统管理员3111',
    code: 'ADMIN1111',
    sort: 31,
    status: 1,
    dataScope: 3,
  }
  api.postRoles(newRole).then((res) => {
    console.log(res.data.data.list)
  })
  getRolePageHandler()
}
//PUT请求
const puttRolesHandler = async () => {
  const raw = JSON.stringify({
    name: '张廷中41',
    code: '张廷中41',
    sort: 31,
    status: 1,
    dataScope: 2,
  })
}
//DELETE请求
const deleteRolesHandler = async () => {}
//PATCH请求
const patchRolesHandler = async () => {}

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
