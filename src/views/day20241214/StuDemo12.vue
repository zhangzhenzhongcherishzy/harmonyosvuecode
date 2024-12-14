<template>
  <div id="wrap">
    <h1>案例计算器</h1>
    <div id="box">
      <input type="text" id="ipt" v-model="rel" readonly>
      <div class="main">
        <input type="button" class="btn" value="AC" @click="clean()">
        <input type="button" class="btn" value="+" @click="add('+')">
        <input type="button" class="btn" value="-" @click="add('-')">
        <input type="button" class="btn" value="/" @click="add('/')">
        <input type="button" class="btn" value="7" @click="add('7')">
        <input type="button" class="btn" value="8" @click="add('8')">
        <input type="button" class="btn" value="9" @click="add('9')">
        <input type="button" class="btn" value="*" @click="add('*')">
        <input type="button" class="btn" value="4" @click="add('4')">
        <input type="button" class="btn" value="5" @click="add('5')">
        <input type="button" class="btn" value="6" @click="add('6')">
        <input type="button" class="btn" value="=" @click="sum()">
        <input type="button" class="btn" value="1" @click="add('1')">
        <input type="button" class="btn" value="2" @click="add('2')">
        <input type="button" class="btn" value="3" @click="add('3')">
        <input type="button" class="btn" value="0" @click="add('0')">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "dayStuDemo12",
};
</script>

<script lang="ts" setup>
import { ref } from "vue";
const rel = ref<string>('');

function add(index: string) {
  rel.value += index;
}

function sum() {
  try {
    rel.value = eval(rel.value);
  } catch (e) {
    rel.value = 'Error';
  }
}

function clean() {
  rel.value = '';
}
</script>

<style lang="scss">
@use "@/assets/common.scss";

body {
  font-family: Arial, sans-serif;
  background: linear-gradient(135deg, #1e3c72, #2a5298);
  color: #fff;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

#box {
  width: 400px;
  height: 650px;
  margin: 50px auto;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

#ipt {
  width: calc(100% - 20px);
  height: 80px;
  font-size: 28px;
  border: none;
  border-radius: 10px;
  margin: 30px 0px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.8);
  color: #333;
  text-align: right;
}

.main {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
}

.btn {
  width: 100%;
  height: 100px;
  border: none;
  border-radius: 10px;
  background: rgba(76, 206, 255, 0.6);
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  padding: 0;
  cursor: pointer;
  transition: all 0.2s;
}

.btn:nth-child(1) {
  background-color: rgba(250, 235, 215, .6);
}

.btn:nth-child(1):hover {
  background-color: rgba(250, 235, 215, 1);
}

.btn:nth-child(12) {
  background-color: rgba(250, 0, 215, .6);
}

.btn:nth-child(12):hover {
  background-color: rgba(250, 0, 215, 1);
}

.btn:hover {
  background: rgba(76, 206, 255, 0.9);
  transform: scale(1.05);
}

.btn-equal {
  grid-column: span 4;
  height: 50px;
  border: none;
  border-radius: 10px;
  background: #f44336;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-equal:hover {
  background: #d32f2f;
  transform: scale(1.1);
}
</style>
