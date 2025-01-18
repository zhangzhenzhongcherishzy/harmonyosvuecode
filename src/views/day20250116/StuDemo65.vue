<template>
  <div class="avatar-upload">
    <label for="avatar-input" class="avatar-label">
      <div v-if="avatarUrl" class="avatar-preview">
        <img :src="avatarUrl" alt="avatar" />
      </div>
      <div v-else class="upload-placeholder">
        <span>选择头像</span>
      </div>
    </label>
    <input
      id="avatar-input"
      type="file"
      accept="image/*"
      @change="handleFileChange"
      style="display: none"
    />
    <button @click="clearAvatar" v-if="avatarUrl">清除头像</button>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  name: "AvatarUpload",
  setup() {
    const avatarUrl = ref<string | null>(null);

    // 处理文件选择
    const handleFileChange = (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          avatarUrl.value = reader.result as string;

          // 存储到 localStorage（可选）
          localStorage.setItem("avatar", avatarUrl.value);
        };
        reader.readAsDataURL(file); // 转换为 Base64 URL
      }
    };

    // 清除头像
    const clearAvatar = () => {
      avatarUrl.value = null;

      // 移除 localStorage 存储（可选）
      localStorage.removeItem("avatar");
    };

    // 初始化时加载已存储头像（可选）
    if (localStorage.getItem("avatar")) {
      avatarUrl.value = localStorage.getItem("avatar");
    }

    return {
      avatarUrl,
      handleFileChange,
      clearAvatar,
    };
  },
};
</script>

<style scoped>
.avatar-upload {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.avatar-label {
  cursor: pointer;
  border: 1px dashed #ccc;
  padding: 20px;
  text-align: center;
}
.avatar-preview img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
}
.upload-placeholder {
  color: #666;
}
</style>
