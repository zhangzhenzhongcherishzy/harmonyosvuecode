<template>
  <div id="wrap">
    <div id="RegisterBox">
      <div>账号：<input type="text" placeholder="请输入账号" v-model="user" /></div>
      <div>密码：<input type="text" placeholder="请输入密码" v-model="pass" /></div>
      <button type="button" @click="Login">登录</button>
      <button type="button" @click="toRegister">注册</button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'LoginView',
}
</script>

<script lang="ts" setup>
import router from '@/router'
import { ref } from 'vue'
//账号密码变量
const user = ref('')
const pass = ref('')
//注册功能
const Login = () => {
  // 获取本地储存
  const item = localStorage.getItem('token')
  if (item !== null) {
    const array = JSON.parse(item)
    if (user.value == '' || pass.value == '') {
      alert('账号或密码不能为空')
    } else if (user.value == pass.value) {
      alert('账号和密码不能相同')
    } else if (user.value == array.user || pass.value == array.pass) {
      router.push('/')
    } else {
      alert('出现未知错误，请联系管理员1325793648')
    }
  } else {
    alert('账号密码不存在')
  }
}
//去注册页注册
const toRegister = () => {
  router.push('/RegisterView')
}
</script>

<style lang="scss" scoped>
#RegisterBox {
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30rem;
  height: auto;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  div {
    width: 100%;
    height: 4rem;
    margin-top: 2rem;
    span {
      color: #7b7b7b;
      display: inline-block;
      text-align: center;
      line-height: 4rem;
      width: 10rem;
    }
    input {
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
  button {
    margin: 2rem 2rem;
  }
}
</style>
