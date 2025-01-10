<template>
  <div id="wrap">
    <h1>element-plus使用</h1>
    <!-- 按钮 -->
    <div class="mb-4">
      <el-button>Default</el-button>
      <el-button type="primary">Primary</el-button>
      <el-button type="success">Success</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
      <el-button type="danger">Danger</el-button>
    </div>

    <div class="mb-4">
      <el-button plain disabled>Plain</el-button>
      <el-button link type="primary" plain>Primary</el-button>
      <el-button type="success" plain>Success</el-button>
      <el-button type="info" plain>Info</el-button>
      <el-button type="warning" plain>Warning</el-button>
      <el-button type="danger" plain>Danger</el-button>
    </div>
    <div class="mb-4">
      <el-button round>Round</el-button>
      <el-button type="primary" round>Primary</el-button>
      <el-button type="success" round>Success</el-button>
      <el-button type="info" round>Info</el-button>
      <el-button type="warning" round>Warning</el-button>
      <el-button type="danger" round>Danger</el-button>
    </div>

    <!-- icon -->
    <div>
      <el-button :icon="Search" circle />
      <el-button type="primary" :icon="Edit" circle />
      <el-button type="success" :icon="Check" circle />
      <el-button type="info" :icon="Message" circle />
      <el-button type="warning" :icon="Star" circle />
      <el-button type="danger" :icon="Delete" circle />
      <hr />

      <el-button type="primary">
        <el-icon class="el-icon--left"><Upload /></el-icon>Upload
      </el-button>
      <el-button type="primary" loading>Loading</el-button>
      <hr />

      <div class="flex flex-wrap items-center mb-4">
        <el-button size="large">Large</el-button>
        <el-button>Default</el-button>
        <el-button size="small">Small</el-button>
        <el-button size="large" :icon="Search">Search</el-button>
        <el-button :icon="Search">Search</el-button>
        <el-button size="small" :icon="Search">Search</el-button>
      </div>
      <div class="flex flex-wrap items-center mb-4">
        <el-button size="large" round>Large</el-button>
        <el-button round>Default</el-button>
        <el-button size="small" round>Small</el-button>
        <el-button size="large" :icon="Search" round>Search</el-button>
        <el-button :icon="Search" round>Search</el-button>
        <el-button size="small" :icon="Search" round>Search</el-button>
      </div>

      <div class="flex flex-wrap items-center">
        <el-button :icon="Search" size="large" circle />
        <el-button :icon="Search" circle />
        <el-button :icon="Search" size="small" circle />
      </div>
      <hr />

      <!-- 插槽 -->
      <el-button size="small" :loading="true" :icon="Search" round>
        <span>默认插槽</span>
        <template #loading>
          <div class="custom-loading">加载中</div>
        </template>
      </el-button>
      <!--  -->
      <el-button type="primary" loading>
        <template #loading>
          <div class="custom-loading">
            <svg class="circular" viewBox="-10, -10, 50, 50">
              <path
                class="path"
                d="
            M 30 15
            L 28 17
            M 25.61 25.61
            A 15 15, 0, 0, 1, 15 30
            A 15 15, 0, 1, 1, 27.99 7.5
            L 15 15
          "
                style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"
              />
            </svg>
          </div>
        </template>
        Loading
      </el-button>
      <!--  -->
      <el-button
        ref="myButton"
        :size="buttonSize"
        :type="buttonType"
        :disabled="isDisabled"
        :should-add-space="true"
      >
        点击我
      </el-button>

      <!--  -->
      <div class="group">
        <h3>Cascader 级联选择器</h3>
        <div>
          <el-cascader
            clearable
            v-model="cascaderVal"
            :options="cascaderOptions"
            :props="cascaderProps"
            @change="cascaderHandleChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'dayStuDemo63',
}
</script>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  Check,
  Delete,
  Edit,
  // Loading,
  Message,
  Search,
  Star,
  Upload,
} from '@element-plus/icons-vue'

const buttonSize = ref('small')

const buttonType = ref('primary')

const isDisabled = ref(false)

//
const cascaderVal = ref(['donggua', 'beigua'])

const cascaderProps = {
  // 次级菜单的展开方式
  expandTrigger: 'hover',
  // 是否多选
  multiple: true,
  checkStrictly: true,
  emitPath: false,
  value: 'itemVal'
}

const cascaderOptions = [
  {
    value: 'xigua',
    itemVal: 'xiguagua',
    label: '西瓜',
    disabled: true
  },
  {
    value: 'donggua',
    itemVal: 'dongguagua',
    label: '东瓜',
    children: [
      {
        value: 'beigua',
        itemVal: 'beiguagua',
        label: '北瓜'
      }
    ]
  }
]

const cascaderHandleChange = (value) => {
  console.log(value, 'cascaderHandleChange')
  console.log(cascaderVal.value, '#cascaderVal')
}
</script>

<style lang="scss" scoped>
.group {
  margin: 10px;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid rgb(72, 140, 208);
}

.el-button .custom-loading .circular[data-v-2720e39d] {
  margin-right: 6px;
  width: 18px;
  height: 18px;
  animation: loading-rotate 2s linear infinite;
}
.circular {
  display: inline;
  height: 30px;
  width: 30px;
  animation: loading-rotate 2s linear infinite;
}

.el-shadow200 {
  width: 200px;
  height: 200px;
  background-color: cyan;
  box-shadow: var(--el-box-shadow-lighter);
}
</style>

