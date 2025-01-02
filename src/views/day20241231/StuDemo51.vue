<!--
HTTP 请求方法是客户端与服务器交互时使用的标准操作，主要包括以下几种：
!1、GET （获取资源）
  1-1、用于从服务器获取数据。
  1-2、不会改变服务器上的数据。
  1-3、在你的代码中：获取角色分页列表。
!2、POST （新增资源）
  2-1、用于向服务器提交数据，创建新的资源。
  2-2、请求体中通常包含新增数据。
  2-3、在你的代码中：新增一个角色。
!3、PUT （更新资源）
  3-1、用于更新已有资源。
  3-2、通常需要在 URL 中指定资源 ID，在请求体中提交完整的更新数据。
  3-3、在你的代码中：通过角色的 ID 修改角色信息。
!4、PATCH （部分更新资源）
  4-1、用于对资源的某些字段进行局部更新，而不是更新整个资源。
  4-2、在你的代码中：通过角色 ID 更新角色状态。
!5、DELETE （删除资源）
  5-1、用于删除服务器上的资源。
  5-2、通常需要在 URL 中指定删除的资源 ID。
  5-3、在你的代码中：通过角色 ID 删除角色。
-->
<template>
  <div id="wrap">
    <h1>使用内置的 fetch API 进行请求</h1>
    <h1>角色管理</h1>
    <button @click="fetchRoles">获取角色列表</button>
    <button @click="addRole">新增角色</button>
    <button @click="updateRole">更新角色</button>
    <button @click="deleteRole">删除角色</button>
    <ul>
      <li v-for="role in roles" :key="role.id">{{ role.name }}</li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 定义响应式变量
const roles = ref([])

// 获取角色列表 (GET)
const fetchRoles = async () => {
  const response = await fetch('https://mock.mengxuegu.com/mock/677259af4008ec3aca764c0a/zhang/getAPI ', { method: 'GET' })
  if (response.ok) {
    const data = await response.json()
    roles.value = data // 更新响应式变量
    console.log(roles.value);
  } else {
    console.error('获取角色失败', response.status)
  }
}

// 新增角色 (POST)
const addRole = async () => {
  const newRole = { name: '新角色', code: 'ROLE_NEW' }
  const response = await fetch('http://localhost:8989/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newRole),
  })
  if (response.ok) {
    const data = await response.json();
    console.log('新增角色成功', data);
    fetchRoles() // 重新获取角色列表
  } else {
    console.error('新增角色失败', response.status)
  }
}

// 更新角色 (PUT)
const updateRole = async () => {
  const updatedRole = { name: '更新后的角色', code: 'ROLE_UPDATED' }
  const response = await fetch('https://example.com/api/roles/1', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedRole),
  })
  if (response.ok) {
    console.log('更新角色成功')
    fetchRoles() // 重新获取角色列表
  } else {
    console.error('更新角色失败', response.status)
  }
}

// 删除角色 (DELETE)
const deleteRole = async () => {
  const response = await fetch('https://example.com/api/roles/1', { method: 'DELETE' })
  if (response.ok) {
    console.log('删除角色成功')
    fetchRoles() // 重新获取角色列表
  } else {
    console.error('删除角色失败', response.status)
  }
}
</script>
