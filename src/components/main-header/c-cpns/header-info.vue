<template>
  <div class="header-info">
    <div class="operation">
      <el-icon class="fullscreen-btn" @click="toggleFullscreen">
        <component :is="FullScreen" />
      </el-icon>
      <el-switch
        v-model="themeMode"
        size="large"
        inline-prompt
        :active-icon="Moon"
        :inactive-icon="Sunny"
        style="--el-switch-on-color: #2c2c2c; --el-switch-off-color: #e5e5e5"
      />
    </div>
    <div class="info">
      <el-dropdown>
        <div class="avatar-with-name">
          <el-avatar :src="userInfo.avatarUrl || DEFAULT_AVATAR_URL" :size="33" />
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="goUserDetail">
              <el-icon size="16"><UserFilled /></el-icon>
              <span>个人信息</span>
            </el-dropdown-item>
            <el-dropdown-item divided @click="loginoutAction">
              <el-icon size="16"><SwitchButton /></el-icon>
              <span>退出登陆</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { DEFAULT_AVATAR_URL } from '@/global/constant'
import { useThemeStore } from '@/stores/theme'
import { storeToRefs } from 'pinia'
import { useUserInfoStore } from '@/stores/userinfo'
import { Moon, Sunny, FullScreen } from '@element-plus/icons-vue'
import router from '@/router'

const themeStore = useThemeStore()
const { themeMode } = storeToRefs(themeStore)
const userInfoStore = useUserInfoStore()
const { userInfo } = storeToRefs(userInfoStore)
const { loginoutAction } = userInfoStore

const isFullscreen = ref(false)

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

const onFullscreenChange = () => {
  isFullscreen.value = !!document.fullscreenElement
}

const goUserDetail = () => {
  router.push({ name: 'UserDetail' })
}

onMounted(() => {
  document.addEventListener('fullscreenchange', onFullscreenChange)
})

onUnmounted(() => {
  document.removeEventListener('fullscreenchange', onFullscreenChange)
})
</script>

<style lang="less" scoped>
.header-info {
  height: 100%;
  display: flex;
  gap: 24px;
  align-items: center;

  .operation {
    display: flex;
    align-items: center;
    gap: 16px;

    .fullscreen-btn {
      font-size: 18px;
      color: var(--text-secondary);
      cursor: pointer;
      padding: 4px;
      border-radius: 4px;
      transition:
        color var(--transition),
        background-color var(--transition);

      &:hover {
        color: var(--text-primary);
        background-color: var(--border-light);
      }
    }
  }

  .info {
    cursor: pointer;
    .avatar-with-name {
      display: flex;
      align-items: center;
      gap: 10px;
      color: var(--text-primary);
      font-weight: 500;
      transition: color var(--transition);
    }
    :deep(.el-tooltip__trigger) {
      outline: none;
    }
    :global(.el-dropdown-menu__item) {
      line-height: 36px !important;
      padding: 6px 22px;
    }
  }
}
</style>
