<template>
  <div class="product">
    <img :src="shopItem.shopPic" alt="Product Image" />
    <div class="product-details">
      <h2>{{ shopItem.shopName }}</h2>
      <p>${{ shopItem.price }}</p>
      <div class="quantity">
        <button type="button" :disabled="shopItem.count <= 1" @click="shopItem.count--">-</button>
        <input
        type="text"
        v-model="shopItem.count"
        @change="() => {shopItem.count = shopItem.count < 1 ? 1 : shopItem.count}"/>
        <button :disabled="shopItem.count >= shopItem.stock" @click="shopItem.count++">+</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type IShopInfo } from '@/types/shop'
import { ref } from 'vue'

const props = defineProps<{
  item: IShopInfo
}>()

const shopItem = ref<IShopInfo>(props.item)
</script>

<style lang="scss" scoped>
.product {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.product img {
  width: 100px;
  height: 100px;
  margin-right: 20px;
  border: 1px solid rgb(104, 165, 226);
}

.product-details {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-details h2 {
  margin: 0;
}

.product-details p {
  font-size: 1.2em;
  font-weight: bold;
  color: #333;
}

/* 数量调节按钮 */
.quantity {
  display: flex;
  align-items: center;
}

.quantity button {
  padding: 5px 10px;
  margin: 0 5px;
  background-color: #2f4fba;
  color: white;
  border: none;
  cursor: pointer;
}

.quantity button:hover {
  background-color: #2ec28b;
}

.quantity input {
  width: 40px;
  text-align: center;
}

button:disabled:hover,
button:disabled {
  background-color: #da222c;
}
</style>
