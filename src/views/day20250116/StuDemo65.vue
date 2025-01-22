<!--
?头像上传
!action：指定上传的接口地址。
  例：http://localhost:8989/files 是接口路径，用于接收文件。
!headers：设置上传请求的头部信息。
  例：Authorization 添加认证 Token。
!data：附加上传的额外数据。
  例：extraData 是动态对象，可以根据需要传入字段，如 { folderId: 123 }
!name：上传的文件字段名，服务器接收时使用。
  例：此处字段名为 file。
!accept：允许上传的文件类型。
  例：image/* 表示只允许上传图片文件。 *：表示所有图片格式   ||   image/png, image/jpeg：指定图片格式
!multiple：是否支持多文件上传。
  boolean:false（默认值）
!show-file-list:true/false(默认值)  是否显示已上传文件列表
!list-type：文件列表展示形式，picture-card 是图片卡片形式
!on-success：上传成功时的回调
  例：handleAvatarSuccess 处理成功后将返回的图片路径存入 myImgList
!before-upload：上传前的校验逻辑。
  例：beforeAvatarUpload 校验文件类型和大小。
!on-exceed：文件超过限制时的回调。
  例：handleExceed 提示用户超出文件限制。
!on-preview：预览文件时的回调。
  例：handlePictureCardPreview 用于弹窗展示图片。
!on-remove：删除文件时的回调。\
  例：handleRemove 控制文件移除逻辑
-->
<template>
  <div id="wrap">
    <h1>头像上传</h1>
    <!--!文件（头像）上传  -->
    <el-upload
      class="upload-demo"
      v-model:file-list="fileList"
      action="http://localhost:8989/files"
      :headers="headers"
      :data="extraData"
      name="file"
      accept="image/*"
      multiple
      :show-file-list="true"
      list-type="picture-card"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :on-exceed="handleExceed"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
    >
      <el-icon>
        <Plus />
      </el-icon>
    </el-upload>

    <!-- !图片预览对话框 -->
    <!--
    v-model：控制对话框显示。
    dialogImageUrl：动态绑定预览图片的路径
    -->
    <el-dialog v-model="dialogVisible">
      <div style="width: 100%; height: 100%">
        <img
          style="object-fit: contain; width: 100%; height: 100%"
          :src="dialogImageUrl"
          alt="Preview Image"
        />
      </div>
    </el-dialog>

    <!-- !图片列表展示 -->
    <!--
    myImgList 是上传成功的图片列表，循环展示图片
    item.filePathCos：图片路径，动态绑定到 src
    -->
    <img :src="myImgSrc" alt="" />
    <div class="my-img-list">
      <img v-for="item in myImgList" :key="item.id" :src="item.filePathCos" :alt="item.fileType" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps, UploadUserFile } from 'element-plus'
export interface IResponseImgInfo {
  code: string
  data: IFileInfo
  msg: string
}
export interface IFileInfo {
  fileExtension: string
  filePathCos: string
  fileSize: string
  fileType: string
  fileUse: string
  id: number
  mineType: string
  uploadTime: string
}
const myImgSrc = ref<string>('')// 单个图片路径
/*---------------------------------请求头设置------------------------------------------------- */
const headers = {
  Authorization:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySW5mbyI6eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoiYWRtaW4iLCJuaWNrbmFtZSI6Iuezu-e7n-euoeeQhuWRmCIsImRlcHRJZCI6MSwicm9sZXMiOiJBRE1JTiJ9LCJpc3MiOiJkeXM2MjMwIiwiZXhwIjoxNzM3NTUyMzE3LCJuYmYiOjE3Mzc1MTYzMTcsImlhdCI6MTczNzUxNjMxN30.5x0AcI5ZVCNloxiQNT_mKQQImnKis_w_KMRlgcGb2cg', // 如果需要 Token 认证

}

/*----------------------------------附加上传的额外数据data------------------------------------- */
const extraData = {}
console.log(extraData);


/*----------------------------------绑定上传的文件列表------------------------------------- */
const fileList = ref<UploadUserFile[]>([])// 当前上传的文件列表

/*----------------------------------on-success：上传成功时的回调------------------------------------- */
const myImgList = ref<IFileInfo[]>([])// 上传成功的图片信息
//handleAvatarSuccess 处理成功后将返回的图片路径存入 myImgList
const handleAvatarSuccess: UploadProps['onSuccess'] = (response: IResponseImgInfo, uploadFile) => {
  console.log(uploadFile, '#uploadFile')
  console.log(response.data, '#response')
  myImgList.value?.push(response.data)
  console.log(myImgList.value, 'yImgList.value')
}

/*----------------------------------before-upload：上传前的校验逻辑------------------------------------- */
//beforeAvatarUpload 校验文件类型和大小。
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 10) {
    ElMessage.error('Avatar picture size can not exceed 10MB!')
    return false
  }
  return true
}

/*----------------------------------on-exceed：文件超过限制时的回调。------------------------------------- */
//handleExceed 提示用户超出文件限制。
const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  ElMessage.warning(
    `The limit is 3, you selected ${files.length} files this time, add up to ${
      files.length + uploadFiles.length
    } totally`,
  )
}

/*----------------------------------on-preview：预览文件时的回调------------------------------------- */
const dialogImageUrl = ref('')// 弹窗显示的图片路径
const dialogVisible = ref(false)// 控制弹窗显示
//handlePictureCardPreview 用于弹窗展示图片。
const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

/*----------------------------------on-remove：删除文件时的回调------------------------------------- */
//handleRemove 控制文件移除逻辑
const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}
</script>

<style lang="scss" scoped>
.my-img-list {
  width: 100%;
  height: 200px;
  display: flex;

  img {
    width: 200px;
    height: 200px;
    object-fit: contain;
    border: 1px solid #ccc;
  }
}
</style>
