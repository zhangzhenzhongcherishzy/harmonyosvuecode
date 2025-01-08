const BASE_URl_TEST = 'http://localhost:8989'
// const BASE_URl_TEST = 'http://192.168.20.213:8989'

// # 以前接口规范
// get: 获取数据，删除数据
// post ： 修改数据，修改状态，添加数据

// # rest接口规范 :使用接口的请求方式+请求的资源路径 做到接口请求的唯一性
// get:获取数据
// post:添加数据
// put :修改数据
// patch ：修改单个字段
// delete: 删除数据

//使用GET获取角色分页列表
export const getRolesPage = async () => {
  try {
    const res = await fetch(BASE_URl_TEST + '/roles/page?pageNum=1&pageSize=10')
    return res.json()
  } catch (error) {
    console.log(error + 'error')
  }
}

//使用POST增加角色
export const postRoles = async () => {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  const newRole = {
    name: '系统管理员3',
    code: 'ADMIN1',
    sort: 3,
    status: 1,
    dataScope: 3,
  }
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(newRole),
  }
  const res = await fetch(BASE_URl_TEST + '/roles', requestOptions)
  console.log(res)
  if (res.ok) {
    return res.json()
  }
}

//使用PUT修改角色信息  id
export const putRolesByRoleID = () => {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  const raw = JSON.stringify({
    name: '坤哥坤哥',
    code: 'ADMIN2',
    sort: 3,
    status: 1,
    dataScope: 3,
  })

  const requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
  }

  fetch(BASE_URl_TEST + '/roles/23468', requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log('error', error))
}

//使用DELETE删除角色信息
export const deleteRolesByids = () => {
  const requestOptions = {
    method: 'DELETE',
  }
  fetch(BASE_URl_TEST + '/roles/23468', requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log('error', error))
}

//使用patch修改角色单个字段
export const patchRolesByids = () => {
  const resquestOptions = {
    method: 'PATCH',
  }
  fetch(BASE_URl_TEST + '/roles/23468/status?status=1', resquestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .then((error) => console.log(error + 'error'))
}
