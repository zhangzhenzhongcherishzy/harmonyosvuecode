<template>
  <div class="shopping-cart">
    <h1>Shopping Cart</h1>
    <!-- 商品列表 -->
    <div class="product-list">
      <template v-for="item in myshops" :key="item.id">
        <slot :item="item"></slot>
      </template>
    </div>

    <!-- 购物车总结 -->
    <div class="cart-summary">
      <h3>Cart Summary</h3>
      <div>
        Total Items: <span>{{ myshops.length }}</span>
      </div>
      <div>
        Total Price: <span>${{ allPrice }}</span>
      </div>
      <button class="checkout-btn">Checkout</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { type IShopInfo } from '@/types/shop'
// shops是Props解构出来的变量，他是只读的，不可以直接修改，需要从新定义变量接受他的值
const { shops } = defineProps<{
  shops: IShopInfo[]
}>()
// 组件自己的ref对象，可以修改
const myshops = ref<IShopInfo[]>(shops)

//添加商品
const addShop = (shop: IShopInfo) => {
  // myshops.value.push({
  //   id: '4',
  //   shopName: '润田矿泉水',
  //   count: 1,
  //   price: 1,
  //   shopPic:
  //     'https://img1.baa.bitautotech.com/dzusergroupfiles/2024/07/29/80ced18ef6044a46b8f48e4b4721f902.jpg',
  //   stock: 9
  // })
  myshops.value.push(shop)
}

/**
 * 修改某个商品指定属性的值（ts:类型约束）
 * @param index
 * @param filed
 * @param val
 */
const editShop = <K extends keyof IShopInfo>(index: number, filed: K, val: IShopInfo[K]) => {
  // shops.value[0].price = 2000
  // myshops.value[index][filed] = val
  myshops.value[index][filed] = val
}

// allPrice 计算属性，他涉及不到修改值，所以可以直接使用 Props解构出来的值
const allPrice = computed(() => {
  return shops.reduce((pre, cur) => {
    return pre + cur.price * cur.count
  }, 0)
})

defineExpose({
  addShop,
  editShop
})
</script>

<style lang="scss" scoped>
/* 主体购物车样式 */
.shopping-cart {
  width: 80%;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: rgba($color: #000000, $alpha: 0.6);
}

/* 商品列表 */
.product-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* 购物车总结 */
.cart-summary {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px solid #ccc;
  text-align: right;
}

.cart-summary h3 {
  margin-bottom: 10px;
}

.cart-summary p {
  font-size: 1.2em;
  margin: 5px 0;
}

.checkout-btn {
  padding: 10px 20px;
  background-color: #2196f3;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 1em;
}

.checkout-btn:hover {
  background-color: #0b7dda;
}
</style>
