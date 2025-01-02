<template>
  <div>
    <form class="studentForm">
      <input v-model="formData.id" type="hidden" class="studentIdToEdit" />

      <label for="studentName">Name</label>
      <input v-model="formData.name" type="text" name="name" class="studentName" required />

      <label for="studentGender">Gender</label>
      <select v-model="formData.gender" name="gender" class="studentGender" required>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      <label for="studentHobbies">Hobbies</label>
      <input
        v-model="formData.hobbies"
        type="text"
        name="hobbies"
        class="studentHobbies"
        required
      />

      <label for="studentEmail">Email</label>
      <input v-model="formData.email" type="email" name="email" class="studentEmail" required />

      <label for="studentPhone">Phone</label>
      <input v-model="formData.phone" type="text" name="phone" class="studentPhone" required />

      <label for="studentAge">Age</label>
      <input v-model="formData.age" type="number" name="age" class="studentAge" required />

      <button @click.prevent="saveStuInfo" type="submit" class="saveStudentBtn">保存信息</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref} from 'vue'

/*------------------------定义数据接口------------------------- */
export interface IStudent {
  id: string | number
  name: string
  gender: string
  hobbies: string
  email: string
  phone: string
  age: number | string
  create_at?: string
  update_at?: string
  seleted?: boolean
}

// Partial 是 TypeScript 中的一个内置工具类型，它用于将一个类型的所有属性变为可选的
export type PIStudent = Partial<IStudent>

/*------------------------接受父组件的props------------------------- */
const { userInfo } = defineProps<{
  userInfo: IStudent
}>()

/*------------------------定义事件准备回传给父组件------------------------- */
const emit = defineEmits<{
  (e: 'save', userInfo: IStudent): void
}>()

/*------------------------把父组件的的传值变成响应式------------------------- */
const formData = ref<PIStudent>(userInfo)

/*------------------------实现定义事件，回传数据在父组件中实现逻辑------------------------- */
const saveStuInfo = () => {
  emit('save', formData.value as IStudent)
}

/*------------------------设置表单数据------------------------- */
const setFormData = (data: IStudent) => {
  formData.value = data
}

/*------------------------重置表单数据------------------------- */
const resetForm = () => {
  setFormData({
    id: '',
    age: '',
    email: '',
    gender: '',
    hobbies: '',
    name: '',
    phone: ''
  })
}

/*------------------------子组件暴露了setFormData、resetForm方法------------------------- */
defineExpose({
  setFormData,
  resetForm
})
</script>

<style lang="scss">
@use '../style/StuDemo48.scss';
label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input,
select {
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.saveStudentBtn {
  background-color: #4caf50;
  color: #fff;
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
  width: 100%;

  &:hover {
    background-color: #45a049;
  }
}
</style>
