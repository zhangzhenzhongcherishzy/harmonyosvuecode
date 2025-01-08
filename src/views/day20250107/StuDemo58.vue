<!--
fetch：
    是一个现代的 JavaScript API，用于在浏览器中发起网络请求。它提供了一种更简洁、更易于使用的方式来替代传统的 XMLHttpRequest 对象进行异步请求。

!基本用法:
fetch 接收两个参数：
  1、input（必需）：请求的 URL（字符串）。
  2、init（可选）：一个配置对象，包含各种选项，用于自定义请求行为
语法：
  fetch('https://api.example.com/data')
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error('Error:', error));

!init 配置对象的详细讲解：
?method：指定 HTTP 方法（如 GET、POST、PUT、DELETE 等）。默认值为 GET。
示例：
  fetch('https://api.example.com/data', {
    method: 'POST',
  });

?headers：指定请求头，以键值对形式传递，用于说明请求的类型、内容等
示例：
  fetch('https://api.example.com/data', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer token',
    },
  });

?body：发送请求体数据，仅适用于 POST、PUT、PATCH 等方法。通常为字符串（如 JSON 格式）。
示例：
  fetch('https://api.example.com/data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: 'John', age: 30 }),
  });

?mode：控制请求的模式：
    1、cors（默认）：允许跨域请求
    2、same-origin：仅允许同源请求。
    3、no-cors：支持跨域，但功能受限（不能访问响应体）。
示例：
  fetch('https://api.example.com/data', { mode: 'cors' });

?credentials：指定是否发送 cookies 和 HTTP 认证信息：
  1、same-origin（默认）：仅发送同源请求的凭据。
  2、include：发送所有请求的凭据（包括跨域）。
  3、omit：不发送凭据。

?cache：控制缓存行为
  1、default（默认）：遵循浏览器默认缓存规则。
  2、no-store：不缓存每个请求。
  3、reload：从服务器获取资源，跳过缓存。
  4、no-cache：验证缓存数据是否过期。
  5、force-cache：始终使用缓存。
示例：
  fetch('https://api.example.com/data', { cache: 'no-cache' });

?redirect：处理重定向的方式
  1、follow（默认）：自动重定向。
  2、error：如果遇到重定向，抛出错误。
  3、manual：返回重定向响应，但不自动执行
示例：
  fetch('https://api.example.com/data', { redirect: 'follow' });

?referrer：设置 Referer 请求头的值。默认为 about:client
示例：fetch('https://api.example.com/data', { referrer: 'https://example.com' });

?referrerPolicy：控制 Referer 信息的发送方式
  1、no-referrer
  2、no-referrer-when-downgrade（默认）
  3、origin
  4、strict-origin-when-cross-origin
示例：fetch('https://api.example.com/data', { referrerPolicy: 'no-referrer' });

?integrity：提供内容完整性校验，确保响应数据未被篡改
示例：fetch('https://api.example.com/data', { integrity: 'sha256-abc123...' });

?keepalive：允许请求在页面卸载时继续进行，适用于日志等操作。
示例：fetch('https://api.example.com/log', { method: 'POST', keepalive: true });

!响应处理：
?fetch 返回的是一个 Promise，解析为 Response 对象。常用的处理方法：
  1、response.ok：请求是否成功
  2、response.status：HTTP 状态码。
  3、response.json()：将响应体解析为 JSON。
  4、response.text()：将响应体解析为文本。
?示例：
  const fetchData = async () => {
    const response = await fetch('https://api.example.com/data');
    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      console.error(`Error: ${response.status}`);
    }
  };
  fetchData();

!错误处理
?fetch 仅在网络错误时抛出异常（如断网），不会对 HTTP 状态码（如 404 或 500）抛出错误。因此需要手动检查 response.ok
示例：
  try {
    const response = await fetch('https://api.example.com/data');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Fetch failed:', error);
  }

!HTTP 请求方法是客户端与服务器交互时使用的标准操作，主要包括以下几种：
?1、GET （获取资源）
  1-1、用于从服务器获取数据。
  1-2、不会改变服务器上的数据。
  1-3、在你的代码中：获取角色分页列表。
?2、POST （新增资源）
  2-1、用于向服务器提交数据，创建新的资源。
  2-2、请求体中通常包含新增数据。
  2-3、在你的代码中：新增一个角色。
?3、PUT （更新资源）
  3-1、用于更新已有资源。
  3-2、通常需要在 URL 中指定资源 ID，在请求体中提交完整的更新数据。
  3-3、在你的代码中：通过角色的 ID 修改角色信息。
?4、DELETE （删除资源）
  5-1、用于删除服务器上的资源。
  5-2、通常需要在 URL 中指定删除的资源 ID。
  5-3、在你的代码中：通过角色 ID 删除角色。
?5、PATCH （部分更新资源）
  4-1、用于对资源的某些字段进行局部更新，而不是更新整个资源。
  4-2、在你的代码中：通过角色 ID 更新角色状态。
-->
<template>
  <div id="wrap">
    <h1>使用内置的 fetch API 进行请求</h1>

    <div>
      <button @click="getRolePageHandler">角色分页列表</button>
      <button @click="postRolesHandler">角色新增功能</button>
      <button @click="puttRolesHandler">角色修改功能</button>
      <button @click="deleteRolesHandler">角色删除功能</button>
      <button @click="patchRolesHandler">角色禁用功能</button>
    </div>
    <div v-if="roles.length>0">
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
  name: 'dayStuDemo58',
}
</script>
<script lang="ts" setup>
//GET POST（请求封装操作）
import { ref } from 'vue'
import {
  getRolesPage,
  postRoles,
  putRolesByRoleID,
  deleteRolesByids,
  patchRolesByids,
} from '@/service/day20250107/StuDemo58'
interface Role {
  id: number;
  name: string;
  code: string;
  sort: number;
  status: number; // 确保定义了status属性
  // dataScope?: number; // 如果有可选的属性，使用可选链?
}
const roles = ref<Role[]>([])

const getRolePageHandler = async () => {
  const resJson = await getRolesPage()
  console.log(resJson, 'resJson')
  roles.value = resJson.data.list
}

const postRolesHandler = async () => {
  const resJson = await postRoles()
  console.log(resJson, 'resJson')
}

const puttRolesHandler = async () => {
  const resJson = await putRolesByRoleID()
  console.log(resJson)
}

const deleteRolesHandler = async () => {
  const resJson = await deleteRolesByids()
  console.log(resJson)
}

const patchRolesHandler = async () => {
  const resJson = await patchRolesByids()
  console.log(resJson)
}
//GET（获取资源）详细步骤
// import { onMounted, ref } from 'vue'
// const roles = ref([])

// const fetchGetRolesList = async () => {
//   //Headers 是一个内置的 Web API，用于构建和操作请求头信息。
//   const myHeaders = new Headers()

//   //User-Agent 是标识请求来源的字段，常见于 HTTP 请求中
//   // myHeaders.append('User-Agent', 'Apifox/1.0.0 (https://apifox.com)')

//   /*
//   向请求头中添加 Authorization 字段：
//   1、Authorization 用于传递认证信息，例如令牌
//   2、这里使用了一个长字符串（JWT）作为认证令牌
//   3、提示：JWT 通常包含三部分：
//     3-1、Header（头部）— 说明令牌的类型和签名算法
//     3-2、Payload（载荷）— 包含用户信息或其他数据
//     3-3、Signature（签名）— 用于验证令牌的有效性
//   */
//   myHeaders.append(
//     'Authorization',
//     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSW5mbyI6eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoiYWRtaW4iLCJuaWNrbmFtZSI6Iuezu-e7n-euoeeQhuWRmGFkbWluIiwiZGVwdElkIjoxLCJyb2xlcyI6IkFETUlOIn0sImlzcyI6ImR5czYyMzAiLCJleHAiOjE3Mjg5MDk5MTgsIm5iZiI6MTcyODg3MzkyOCwiaWF0IjoxNzI4ODczOTE4fQ.9xhdL57Qs38Mlm0K-TCwgrQjET1ZS2jUZhIOob0-pGk',
//   )

//   /*
//   定义请求选项对象 requestOptions
//     1、method: 'GET'：指定请求方法为 GET（获取资源）
//     2、headers: myHeaders：附加自定义请求头
//     3、redirect: 'follow'：设置在发生重定向时自动跟随
//   */
//   const requestOptions:RequestInit = {
//     method: 'GET',
//     headers: myHeaders,
//     redirect: 'follow',
//   }

//   /*
//   发起 HTTP 请求：
//     1、使用 fetch 方法向指定的 URL 发出请求
//     2、URL 解释
//       2-1、keywords=管理员：按关键字“管理员”筛选
//       2-2、pageNum=1：请求第 1 页
//       2-3、pageSize=10：每页返回 10 条数据
//     3、await：等待请求完成，返回响应对象 res
//   */
//   const res = await fetch(
//     'http://127.0.0.1:4523/m1/5708658-5389884-d3d6fe3f/roles/page?keywords=管理员&pageNum=1&pageSize=10',
//     requestOptions,
//   )

//   /*
//   打印响应对象:res 包含响应的状态码、头部信息、响应体等数据。
//     1、res.ok：是否为成功响应（状态码 200–299）
//     2、res.status：HTTP 状态码（如 200, 404）
//     3、res.headers：响应头信息
//   */
//   console.log(res)

//   //检查响应状态:res.ok 为 true 时，表示响应成功（状态码在 200–299 之间）
//   if (res.ok) {
//     //解析响应数据：使用 res.json() 方法将响应体解析为 JSON 格式对象、await 表示这是异步操作，需等待解析完成。
//     const resJson = await res.json()
//     console.log(resJson, 'resJson')
//     roles.value = resJson.data.list
//     console.log(roles.value)
//   }
// }

// onMounted(async () => {
//   await fetchGetRolesList()
// })
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
