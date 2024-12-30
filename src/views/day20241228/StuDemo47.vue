<template>
  <div id="wrap">
    <h1>案例-学生成绩管理系统2(父传子，子传父回传处理)</h1>
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

          <UserInfoForm :user-info="stuFormData" @save="saveStuInfo"></UserInfoForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { getNowDateTime } from '@/utils'
import { uniqueId } from 'lodash'
/*---------------------------组件导入------------------------------ */
import UserInfoForm from './components/StuDemo47userInfoForm.vue'

/*---------------------------接口导入------------------------------ */
import { type IStudent } from './components/StuDemo47userInfoForm.vue'

/*---------------------------弹窗开关控制------------------------------ */
const isShowModel = ref(false)

/*---------------------------点击关闭弹窗------------------------------ */
const closeModel = () => {
  isShowModel.value = false
}

/*---------------------------模拟虚拟数据------------------------------ */
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
    update_at: getNowDateTime(),
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
    update_at: getNowDateTime(),
  },
]

/*--------------------绑定新增学信息的输入框数据------------------ */
const stuFormData = ref<IStudent>({
  id: 1,
  name: '小明',
  gender: 'Female',
  hobbies: '唱跳rap',
  email: '7635572389@qq.com',
  phone: '13659486423',
  age: 18,
})

/*-------------------------平均年龄的计算----------------------- */
const avgAge = computed(() => {
  return (
    Math.round(
      searchStudentArr.value.reduce(
        (previousValue, currentValue) => previousValue + Number(currentValue.age),
        0,
      ) / searchStudentArr.value.length,
    ) || 0
  )
})

/*--------------------实现修改动态修改头部标题------------------ */
const modelInfo = ref({
  type: 'add',
  title: '添加学生信息',
})

/*------------------------保存学生信息------------------------- */
const saveStuInfo = (userInfo: IStudent) => {
  // 通过子组件事件传过来的表单值赋值给父组件的ref对象
  stuFormData.value = userInfo
  // 判断是修改还是添加
  if (modelInfo.value.type === 'add') {
    // 添加学生信息1.生成学生id  2.把新的学生信息追加到学生数组中
    stuFormData.value.id = uniqueId('newstu_')
    studentArr.push({
      ...JSON.parse(JSON.stringify(stuFormData.value)),
      create_at: getNowDateTime(),
      update_at: getNowDateTime(),
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
  // 关闭模态框
  closeModel()
}

/*---------------------------添加学生信息------------------------------ */
const addStudent = () => {
  stuFormData.value = {
    id: 1,
    name: '小明',
    gender: 'Female',
    hobbies: '唱跳rap',
    email: '7635572389@qq.com',
    phone: '13659486423',
    age: 18,
  }
  modelInfo.value.type = 'add'
  modelInfo.value.title = '添加学生信息'
  isShowModel.value = true
}

/*---------------------------实现删除功能------------------------------ */
const delStuInfo = (item: IStudent) => {
  const index = studentArr.findIndex((i) => i.id === item.id)
  studentArr.splice(index, 1)
  generateSearchData()
  changeSeletedItem()
}
/*---------------------------删除选中学生------------------------------ */
const delSelectedStudent = () => {
  searchStudentArr.value.forEach((i) => {
    if (i.seleted) {
      delStuInfo(i)
    }
  })
}

/*---------------------------修改学生信息------------------------------ */
const editStuInfo = (stu: IStudent) => {
  modelInfo.value.type = 'edit'
  modelInfo.value.title = '修改学生信息'
  stuFormData.value = JSON.parse(JSON.stringify(stu))
  isShowModel.value = true
}

/*---------------------------实现检索功能------------------------------ */
const keyword = ref('')
// 绑定数据变量(初始化)
const searchStudentArr = ref<Array<IStudent>>([])
const generateSearchData = () => {
  searchStudentArr.value = studentArr.filter((i) => i.name.includes(keyword.value))
}

/*---------------------------全选不全选功能------------------------------ */
// 是否全选开关
const isAllSelected = ref(false)
// 全选不全选
const changeSelectedAll = (event: Event) => {
  const checked = (event.target as HTMLInputElement).checked
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
/*---------------------------初始化------------------------------ */
const initAction = () => {
  generateSearchData()
}
/*---------------------------调用初始化函数------------------------------ */
initAction()
</script>

<style lang="scss">
@use './style/StuDemo47.scss';
</style>
