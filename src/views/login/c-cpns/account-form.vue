<template>
  <el-form
    :model="accountFormData"
    :rules="accountFormRules"
    ref="accountFormRef"
    label-width="auto"
    status-icon
  >
    <el-form-item label="帐号" prop="username">
      <el-input placeholder="请输入帐号" v-model="accountFormData.username" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        placeholder="请输入密码"
        type="password"
        v-model="accountFormData.password"
        show-password
      />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import type { FormRules } from 'element-plus'
import { ref, reactive } from 'vue'
import type { ElForm } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useUserInfoStore } from '@/stores/userinfo'
import type { IAccount } from '@/types'
import router from '@/router'
import localCache from '@/utils/cache'
import { PASSWORD_KEY, USERNAME_KEY } from '@/global/constant'
const userInfoStore = useUserInfoStore()

const { loginAction } = userInfoStore

const accountFormRef = ref<InstanceType<typeof ElForm>>()
const accountFormData = reactive<IAccount>({
  username: localCache.get<string>(USERNAME_KEY) || '',
  password: localCache.get<string>(PASSWORD_KEY) || '',
})
const accountFormRules: FormRules = {
  username: [
    { required: true, message: '请输入帐号', trigger: 'change' },
    { min: 5, max: 12, message: '帐号长度必须在5到12个字符之间', trigger: 'change' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'change' },
    {
      pattern: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>?/]).{8,20}$/,
      message: '密码长度 8-20 位，必须同时包含 字母、数字、特殊字符',
      trigger: 'change',
    },
  ],
}
const handleLoginAction = async (isRememberPassword: boolean) => {
  console.log(isRememberPassword)
  await accountFormRef.value?.validate(async (valid) => {
    if (valid) {
      try {
        await loginAction(accountFormData)
        ElMessage.success('登录成功')
        if (isRememberPassword) {
          localCache.set(USERNAME_KEY, accountFormData.username)
          localCache.set(PASSWORD_KEY, accountFormData.password)
        } else {
          localCache.remove(USERNAME_KEY)
          localCache.remove(PASSWORD_KEY)
        }
        router.push({ name: 'Main', replace: true })
      } catch (error) {
        console.log(error)
      }
    } else {
      ElMessage.error('表单校验不通过')
    }
  })
}

defineExpose({
  handleLoginAction,
})
</script>
