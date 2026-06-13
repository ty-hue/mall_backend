<template>
  <div class="header-info">
    <div class="operation">
      <el-switch
        v-model="themeMode"
        size="large"
        style="--el-switch-on-color: #2c2c2c; --el-switch-off-color: #f2f2f2"
      >
        <template #active-action>
          <span class="custom-active-action">
            <el-icon size="20" color="#fff">
              <moon />
            </el-icon>
          </span>
        </template>
        <template #inactive-action>
          <span class="custom-inactive-action">
            <el-icon size="20" color="#606266">
              <Sunny />
            </el-icon>
          </span>
        </template>
      </el-switch>
    </div>
    <div class="info">
      <el-dropdown>
        <div class="avatar-with-name">
          <el-avatar :src="userInfo.avatarUrl || DEFAULT_AVATAR_URL" :size="33" />
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <el-icon size="16" color="#606266">
                <UserFilled />
              </el-icon>
              <span>个人信息</span>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <el-icon size="16" color="#606266">
                <Lock />
              </el-icon>
              <span>修改密码</span>
            </el-dropdown-item>

            <el-dropdown-item divided @click="loginoutAction">
              <el-icon size="16" color="#606266">
                <SwitchButton />
              </el-icon>
              <span>退出登陆</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DEFAULT_AVATAR_URL } from '@/global/constant'
import { useThemeStore } from '@/stores/theme'
import { storeToRefs } from 'pinia'
import { useUserInfoStore } from '@/stores/userinfo'
const themeStore = useThemeStore()
const { themeMode } = storeToRefs(themeStore)
const userInfoStore = useUserInfoStore()
const { userInfo } = storeToRefs(userInfoStore)
const { loginoutAction } = userInfoStore
</script>

<style lang="less" scoped>
.header-info {
  height: 100%;
  display: flex;
  gap: 20px;
  align-items: center;
  .el-switch {
    .custom-active-action {
      border-radius: 50%;
      height: 20px;
      background-color: rgb(20, 20, 20);
    }
    .custom-inactive-action {
      border-radius: 50%;
      height: 20px;
      background-color: #fff;
    }
  }
  .info {
    cursor: pointer;
    .avatar-with-name {
      display: flex;
      align-items: center;
      gap: 10px;
      color: #333;
      font-weight: 500;
    }
    :global(.el-dropdown-menu__item) {
      line-height: 36px !important;
      padding: 6px 22px;
    }
  }
}
</style>
