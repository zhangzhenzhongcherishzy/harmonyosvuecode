<template>
  <div id="wrap">
    <h1>購物車</h1>
    <div>
      <button type="button" @click="addShopItem">模拟新增商品</button>
      <button type="button" @click="editShopItem">直接修改父组件的shop值</button>
    </div>
    <StuDemo50ShopCar ref="shopCarRef" :shops="shops" v-slot="{ item }">
      <StuDemo50ShopItem :item="item"></StuDemo50ShopItem>
    </StuDemo50ShopCar>
  </div>
</template>

<script lang="ts">
export default {
  name: 'dayStuDemo50',
}
</script>

<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import StuDemo50ShopCar from './components/StuDemo50ShopCar.vue'

import { type IShopInfo } from '@/types/shop'
import StuDemo50ShopItem from './components/StuDemo50ShopItem.vue'

// 模版引用
const shopCarRef = useTemplateRef('shopCarRef')

const shops = ref<IShopInfo[]>([
  {
    id: '1',
    shopName: 'laoda',
    count: 1,
    price: 100,
    shopPic:
      'https://img2.baidu.com/it/u=978079617,2545821976&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1023',
    stock: 10
  },
  {
    id: '2',
    shopName: '黑中华',
    count: 1,
    price: 50,
    shopPic:
      'https://img2.baidu.com/it/u=709272474,3238933160&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1067',
    stock: 5
  },
  {
    id: '3',
    shopName: '马自达',
    count: 1,
    price: 20000,
    shopPic:
      'https://img1.baa.bitautotech.com/dzusergroupfiles/2024/07/29/80ced18ef6044a46b8f48e4b4721f902.jpg',
    stock: 50
  }
])

const addShopItem = () => {
  shopCarRef.value?.addShop({
    id: '4',
    shopName: '润田矿泉水',
    count: 1,
    price: 1,
    shopPic:
      'https://img1.baa.bitautotech.com/dzusergroupfiles/2024/07/29/80ced18ef6044a46b8f48e4b4721f902.jpg',
    stock: 9
  })
}

const editShopItem = () => {
  shopCarRef.value?.editShop(0, 'price', 120)
}
</script>
