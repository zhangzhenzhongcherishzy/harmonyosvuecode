// const BASE_URl_TEST = 'http://goapi.sanjitian.cn/api'
const BASE_URl_TEST = import.meta.env.VITE_BASE_PATH

// # 以前接口规范
// get: 获取数据，删除数据
// post ： 修改数据，修改状态，添加数据


// # rest接口规范 :使用接口的请求方式+请求的资源路径 做到接口请求的唯一性
// get:获取数据
// post:添加数据
// put :修改数据
// patch ：修改单个字段
// delete: 删除数据

// 角色分页列表
export const getRolesPage = async () => {

  try {
    const res = await fetch(BASE_URl_TEST + '/roles/page?pageNum=1&pageSize=50', {
      method: 'GET'
    })
    return res.json()

  } catch (error) {
    console.log(error,'error');

  }

}


export const postRoles = async () => {
  const myHeaders = new Headers()
  // 设置请求携带的数据格式是 JSON格式
  myHeaders.append('Content-Type', 'application/json')
  // 添加的 自定义的 header 信息（通常用户使用的秘钥会放到这里，后端接受之后用于判断用户是否登录）
  myHeaders.append(
    'Authorization',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSW5mbyI6eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoiYWRtaW4iLCJuaWNrbmFtZSI6Iuezu-e7n-euoeeQhuWRmGFkbWluIiwiZGVwdElkIjoxLCJyb2xlcyI6IkFETUlOIn0sImlzcyI6ImR5czYyMzAiLCJleHAiOjE3Mjg5MDk5MTgsIm5iZiI6MTcyODg3MzkyOCwiaWF0IjoxNzI4ODczOTE4fQ.9xhdL57Qs38Mlm0K-TCwgrQjET1ZS2jUZhIOob0-pGk'
  )

  const newRole = {
    id: 200,
    name: '333',
    code: '7878',
    sort: 2,
    status: 1,
    dataScope: 3
  }

  // fetch 配置项
  const requestOptions = {
    // 请求方式 GET POST DELETE  PUT
    method: 'POST',
    // 设置 请求的 header 头信息
    headers: myHeaders,
    // 请求携带的数据
    body: JSON.stringify(newRole)
  }
  const res = await fetch('http://goapi.sanjitian.cn/api/roles', requestOptions)

  console.log(res)

  if (res.ok) {
    return res.json()
    // const resJson = await res.json()
    // console.log(resJson, 'resJson')
  }
}


/**
 * 通过角色的id 修改角色的数据
 */
export const putRolesByRoleID = () => {

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "name": "重四易应标压3",
    "code": "8888",
    "sort": 1,
    "status": 1,
    "dataScope": 1
  });

  const requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
  };

  fetch(BASE_URl_TEST + "/roles/205", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}




// 删除角色
export const deleteRolesByids = () => {

  const requestOptions = {
    method: 'DELETE'
  };

  fetch(BASE_URl_TEST + "/roles/69", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}


export const patchRolesStatusByRoleID = () => {
  const requestOptions = {
    method: 'PATCH',
  };

  fetch("http://goapi.sanjitian.cn/api/roles/3284/status?status=0", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}
