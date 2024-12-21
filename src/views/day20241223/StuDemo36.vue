<template>
  <div>
    <div class="main">
      <div class="overview">班级平均年龄: {{ avgAge }}</div>

      <div class="tools-header">
        <button class="openModalBtn" @click="addStudent">添加学生</button>
        <button class="openModalBtn" @click="delSelectedStudent">删除</button>
        <div>
          <input
            v-model.trim="keyword"
            type="text"
            name="keyword"
            class="keyword"
            placeholder="Search by name"
          />
          <button @click="generateSearchData" type="button" class="searchBtn">搜索</button>
        </div>
      </div>

      <table class="studentTable">
        <thead>
          <tr>
            <th>
              <input
                v-model="isAllSelected"
                @change="changeSelectedAll"
                type="checkbox"
                class="selectAll"
              />
            </th>
            <th>ID</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Hobbies</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Age</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <!-- Student rows will be added dynamically here -->
          <tr v-for="item in searchStudentArr" :key="item.id">
            <td>
              <input
                @change="changeSeletedItem"
                v-model="item.seleted"
                type="checkbox"
                class="selectAll"
              />
            </td>
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.gender }}</td>
            <td>{{ item.hobbies }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.phone }}</td>
            <td>{{ item.age }}</td>
            <td>{{ item.create_at }}</td>
            <td>{{ item.update_at }}</td>
            <td>
              <button @click="editStuInfo(item)" class="editBtn" type="button">修改</button>
              <button @click="delStuInfo(item)" class="deleteBtn" type="button">删除</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Modal for adding/editing students -->
      <div v-show="isShowModel" class="studentModal modal" @click="closeModel">
        <div class="modal-content" @click.stop>
          <h3 class="modalTitle">{{ modelInfo.title }}</h3>
          <form class="studentForm">
            <input v-model="stuFormData.id" type="hidden" class="studentIdToEdit" />

            <label for="studentName">Name</label>
            <input
              v-model="stuFormData.name"
              type="text"
              name="name"
              class="studentName"
              required
            />

            <label for="studentGender">Gender</label>
            <select v-model="stuFormData.gender" name="gender" class="studentGender" required>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <label for="studentHobbies">Hobbies</label>
            <input
              v-model="stuFormData.hobbies"
              type="text"
              name="hobbies"
              class="studentHobbies"
              required
            />

            <label for="studentEmail">Email</label>
            <input
              v-model="stuFormData.email"
              type="email"
              name="email"
              class="studentEmail"
              required
            />

            <label for="studentPhone">Phone</label>
            <input
              v-model="stuFormData.phone"
              type="text"
              name="phone"
              class="studentPhone"
              required
            />

            <label for="studentAge">Age</label>
            <input v-model="stuFormData.age" type="number" name="age" class="studentAge" required />

            <button @click.prevent="saveStuInfo" type="submit" class="saveStudentBtn">
              保存信息
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { getNowDateTime } from '@/utils'

import { uniqueId } from 'lodash'

interface IStudent {
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

// 控制模态框的显示隐藏
const isShowModel = ref(false)
// 模态框配置
const modelInfo = ref({
  type: 'add',
  title: '添加学生信息'
})
const keyword = ref('')
// 是否全选
const isAllSelected = ref(false)

const stuFormData = ref<IStudent>({
  id: '',
  age: '',
  email: '',
  gender: '',
  hobbies: '',
  name: '',
  phone: ''
})

// 模拟接口获取的数据
const studentArr: Array<IStudent> = [
  {
    id: 1,
    name: 'Alice',
    gender: 'Female',
    hobbies: 'Reading',
    email: 'alice@example.com',
    phone: '12345678901',
    age: 20,
    create_at: getNowDateTime(),
    update_at: getNowDateTime()
  },
  {
    id: 2,
    name: 'Bob',
    gender: 'Male',
    hobbies: 'Sports',
    email: 'bob@example.com',
    phone: '10987654321',
    age: 22,
    create_at: getNowDateTime(),
    update_at: getNowDateTime()
  }
]

// 绑定数据变量(初始化)
const searchStudentArr = ref<Array<IStudent>>([])

// 检索数据
const generateSearchData = () => {
  searchStudentArr.value = studentArr.filter((i) => i.name.includes(keyword.value))
}

// 初始化
const initAction = () => {
  generateSearchData()
}

/**
 * 保存学生信息
 */
const saveStuInfo = () => {
  // 判断是修改还是添加
  if (modelInfo.value.type === 'add') {
    // 添加学生信息
    // 1.生成学生id
    // 2.把新的学生信息追加到学生数组中
    stuFormData.value.id = uniqueId('newstu_')
    console.log(stuFormData.value)
    studentArr.push({
      ...JSON.parse(JSON.stringify(stuFormData.value)),
      create_at: getNowDateTime(),
      update_at: getNowDateTime()
    })
  } else {
    console.log(stuFormData.value, '修改学生信息')
    stuFormData.value.update_at = getNowDateTime()
    // 修改学生信息
    const index = studentArr.findIndex((i) => i.id === stuFormData.value.id)
    studentArr[index] = JSON.parse(JSON.stringify(stuFormData.value))
  }
  generateSearchData()
  changeSeletedItem()
  console.log(studentArr)

  // 关闭模态框
  closeModel()
}

/**
 * 添加学生信息
 */
const addStudent = () => {
  stuFormData.value = {
    id: '',
    age: '',
    email: '',
    gender: '',
    hobbies: '',
    name: '',
    phone: ''
  }
  modelInfo.value.type = 'add'
  modelInfo.value.title = '添加学生信息'
  isShowModel.value = true
}

/**
 * 修改学生信息
 * @param stu
 */
const editStuInfo = (stu: IStudent) => {
  modelInfo.value.type = 'edit'
  modelInfo.value.title = '修改学生信息'
  stuFormData.value = JSON.parse(JSON.stringify(stu))
  isShowModel.value = true

  // console.log(stuFormData.value, 'stuFormData.value')
}

/**
 * 删除学生
 * @param item
 */
const delStuInfo = (item: IStudent) => {
  const index = studentArr.findIndex((i) => i.id === item.id)
  studentArr.splice(index, 1)
  generateSearchData()
  changeSeletedItem()
}
/**
 * 删除选中学生
 */
const delSelectedStudent = () => {
  searchStudentArr.value.forEach((i) => {
    if (i.seleted) {
      delStuInfo(i)
    }
  })
}

// 关闭模态框
const closeModel = () => {
  isShowModel.value = false
}

// 全选全不选
const changeSelectedAll = (event: Event) => {
  const checked = (event.target as HTMLInputElement).checked
  console.log(checked, 'checked')

  if (checked) {
    searchStudentArr.value.forEach((item: IStudent) => {
      item.seleted = true
    })
  } else {
    searchStudentArr.value.forEach((item: IStudent) => {
      item.seleted = false
    })
  }
}
// 修改全选全不选状态
const changeSeletedItem = () => {
  if (searchStudentArr.value.length > 0) {
    isAllSelected.value = searchStudentArr.value.every((i) => i.seleted)
  } else {
    isAllSelected.value = false
  }
}

/**
 * 计算平均年龄
 */
const avgAge = computed(() => {
  return (
    Math.round(
      searchStudentArr.value.reduce(
        (previousValue, currentValue) => previousValue + Number(currentValue.age),
        0
      ) / searchStudentArr.value.length
    ) || 0
  )
})

initAction()
</script>

<style lang="scss" scoped>
@use './style/StuDemo36.scss';
</style>
