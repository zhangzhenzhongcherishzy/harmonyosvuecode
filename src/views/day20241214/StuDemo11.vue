<template>
  <div id="wrap">
    <h1>Tab切换</h1>
    <!-- !导航部分 -->
    <div id="btn-wrap">
      <!-- todo['btn', ...] 表示类名数组，第一个类名始终是 'btn'，即无论条件如何，都会应用 btn 类，即表示在原有的类名基础上添加类名 -->
      <div v-for="(item, index) in navs" :key="index" @click="_index = index"
        :class="['btn', _index == index ? 'active' : '']">
        <span>{{ item }}</span>
      </div>
    </div>
    <!-- !内容部分 -->
    <div id="con-wrap">
      <!-- 第一盒子里的内容 -->
      <div class="con" v-if="_index == 0">
        <div class="list-cird" v-for="(item, index) in list1" :key="index">
          <img :src="item.img" />
          <span class="list-crid-title">{{ item.title }}</span>
          <span class="list-crid-content">{{ item.intr }}</span>
        </div>
      </div>
      <!-- 第二个盒子里面的内容 -->
      <div class="con" v-if="_index == 1">
        <div class="list-cird" v-for="(item, index) in list2" :key="index">
          <img :src="item.img" />
          <span class="list-crid-title">{{ item.title }}</span>
          <span class="list-crid-content">{{ item.intr }}</span>
        </div>
      </div>
      <!-- 第三个盒子里面的内容 -->
      <div class="con" v-if="_index == 2">
        <div class="list-cird" v-for="(item, index) in list3" :key="index">
          <img :src="item.img" />
          <span class="list-crid-title">{{ item.title }}</span>
          <span class="list-crid-content">{{ item.intr }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "dayStuDemo11",
}
</script>

<script lang="ts" setup>
import { ref } from "vue"
import axios from "axios"

// 定义接口类型
interface ListItem {
  img: string;
  title: string;
  intr: string;
}
//列表页索引
const _index = ref(0)
//列表页的按钮数据
const navs = ref(["原神", "鸣潮", "双人成行"])

//请求列表1的数据
const list1 = ref<ListItem[]>([])
const data1 = async () => {
  const response = await axios.get(
    "https://mock.mengxuegu.com/mock/645b57ae7ba95d67784d6738/img/tabone",
  )
  return response.data
}
data1().then((data1) => {
  console.log(data1)
  list1.value = data1
})
//请求列表2的数据
const list2 = ref<ListItem[]>([])
const data2 = async () => {
  const response = await axios.get(
    "https://mock.mengxuegu.com/mock/645b57ae7ba95d67784d6738/img/tabtwo",
  )
  return response.data
}
data2().then((data) => {
  console.log(data)
  list2.value = data
})
//请求列表3的数据
const list3 = ref<ListItem[]>([])
const data3 = async () => {
  const response = await axios.get(
    "https://mock.mengxuegu.com/mock/645b57ae7ba95d67784d6738/img/tabthree",
  )
  return response.data
}
data3().then((data) => {
  console.log(data)
  list3.value = data
})
</script>

<style lang="scss">
@use "@/assets/common.scss";

/* 资讯部分导航 */
#btn-wrap {
  margin-top: 2vh;
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 5px;
}

.btn {
  width: calc(100% / 3 - 2vh);
  margin: 0 1vh;
  height: 80px;
  font-size: 20px;
  text-align: center;
  font-weight: bold;
  line-height: 80px;
  border-radius: 0.75rem;
  color: #fff;
  background-color: #4cceff;
}

.active {
  color: #4cceff;
  background-color: rgba(255, 255, 255, 0.7);
}

/* 切换内容部分 */
#con-wrap {
  width: 90%;
  height: 100%;
  margin: 0 auto;
  border-radius: 10px;
  background-color: rgba(241, 242, 243, 0.9);
}

.con {
  width: 100%;
  height: auto;
  min-height: 60vh;
  overflow-y: auto;
  display: flex;
  align-items: center;
  justify-content: start;
  flex-wrap: wrap;
}

.con::-webkit-scrollbar {
  width: 1px;
}

.list-cird {
  width: calc((100% / 2) - 30px);
  height: 100%;
  margin: 10px auto;
  background-color: rgba(76, 206, 255, 0.9);
  box-shadow: 5px 5px 5px rgba(85, 0, 255, 0.5);
  border-radius: 4px;
  box-shadow: 1px 1px 5px #eee;
}

.list-crid>img {
  width: calc(100% - 20px);
  height: 300px;
  display: block;
  margin: 10px auto;
}

.list-crid-title {
  font-size: 18px;
  width: calc(100% - 20px);
  display: block;
  line-height: 18px;
  padding: 10px 0;
  margin: 0 auto;
  font-weight: bold;
}

.list-crid-content {
  width: calc(100% - 20px);
  margin: 10px auto;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
}
</style>
