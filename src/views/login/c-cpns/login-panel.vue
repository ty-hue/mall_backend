<template>
  <div class="login-panel">
    <h2 class="title">后台管理系统</h2>
    <div class="tabs">
      <el-tabs stretch v-model="activeTab" type="border-card">
        <el-tab-pane name="account">
          <template #label>
            <span class="custom-tabs-label">
              <el-icon><user /></el-icon>
              <span>帐号登录</span>
            </span>
          </template>
          <account-form ref="accountFormRef" />
        </el-tab-pane>
        <el-tab-pane name="phone">
          <template #label>
            <span class="custom-tabs-label">
              <el-icon><iphone /></el-icon>
              <span>手机号登录</span>
            </span>
          </template>
          <phone-form ref="phoneFormRef" />
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="remember-and-forget">
      <el-checkbox v-model="isRememberPassword" label="记住密码" size="large" />
      <el-link href="https://element-plus.org" target="_blank">忘记密码</el-link>
    </div>
    <el-button class="login-btn" type="primary" @click="handleLogin">立即登录</el-button>
  </div>
</template>
<script setup lang="ts">
import localCache from '@/utils/cache.ts'
import AccountForm from './account-form.vue'
import PhoneForm from './phone-form.vue'
import { ref, watch } from 'vue'
import { IS_REMEMBER_PASSWORD_KEY } from '@/global/constant.ts'

const activeTab = ref('account')
const isRememberPassword = ref<boolean>(localCache.get<boolean>(IS_REMEMBER_PASSWORD_KEY) || false)
const accountFormRef = ref<InstanceType<typeof AccountForm>>()
const phoneFormRef = ref<InstanceType<typeof PhoneForm>>()
watch(isRememberPassword, (newVal) => {
  localCache.set(IS_REMEMBER_PASSWORD_KEY, newVal)
})
const handleLogin = async () => {
  console.log(activeTab.value)
  if (activeTab.value === 'account') {
    await accountFormRef.value?.handleLoginAction(isRememberPassword.value)
  } else if (activeTab.value === 'phone') {
  }
}
</script>

<style lang="less" scoped>
.login-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 330px;
  background-color: #fff;
  padding: 24px;
  border-radius: 4px;
  .title {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 24px;
  }
  .tabs {
    width: 100%;
    margin-bottom: 12px;
    .custom-tabs-label {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }
  .remember-and-forget {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }
  .login-btn {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
  }
}
</style>
