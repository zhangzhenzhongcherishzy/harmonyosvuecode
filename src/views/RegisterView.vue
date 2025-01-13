<template>
  <div id="wrap">
    <div id="RegisterBox">
      <div><span>账&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：</span><input type="text" placeholder="请输入账号" v-model="user" /></div>
      <div><span>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码：</span><input type="text" placeholder="请输入密码" v-model="pass" /></div>
      <div><span>确认密码：</span><input type="text" placeholder="请输入确认密码" v-model="againpass" /></div>
      <button type="button" @click="Register">注册账号</button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'RegisterView',
}
</script>

<script lang="ts" setup>
import router from '@/router'
import { ref } from 'vue'
//账号密码变量
const user = ref('')
const pass = ref('')
const againpass = ref('')
//注册功能
const Register = () => {
  if (user.value == '' || pass.value == '' || againpass.value == '') {
    alert('账号或密码不能为空')
  } else if (pass.value != againpass.value) {
    alert('两次输入的密码不一致')
    pass.value = ''
    againpass.value = ''
  } else if (user.value == pass.value) {
    alert('账号和密码不能相同')
  } else {
    setStorage()
    alert('注册成功')
    router.push('/LoginView')
  }
}
//封装本地存储
function setStorage() {
  const arr = []
  //存储输入框元素内容的对象
  const obj = {
    user: user.value,
    pass: pass.value,
  }
  //不能直接存对象，所以给它转成字符串
  const objstr = JSON.stringify(obj)
  // console.log(objstr);
  //暂定储存
  arr.push(objstr)
  //把数组转成字符串
  const arrStr = arr.join('&')
  //存储
  localStorage.setItem('users', arrStr)
}
</script>

<style lang="scss" scoped>
#RegisterBox{
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 30rem;
  height: auto;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  div{
    width: 100%;
    height: 4rem;
    margin-top: 5px;
    span{
      color: #7b7b7b;
      display: inline-block;
      text-align: center;
      line-height: 4rem;
      width: 10rem;
    }
    input{
      color: #7b7b7b;
      border: none;
      outline: none;
      height: 3rem;
      padding-left: 2rem;
      border-radius: 99999999px;
      width: calc(100% - 13rem);
      background-color: #f1f2f3;
    }
  }
  button{
    margin: 2rem 2rem;
  }
}
</style>
