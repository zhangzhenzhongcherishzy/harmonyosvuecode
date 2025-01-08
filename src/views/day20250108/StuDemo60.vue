<template>
  <div id="wrap">
    <h1>axios封装</h1>
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
  name: 'dayStuDemo60',
}
</script>

<script lang="ts" setup>

</script>

<style lang="scss"></style>
