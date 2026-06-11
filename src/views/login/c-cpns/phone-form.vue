<template>
  <el-form ref="phoneFormRef" :model="phoneForm" label-width="auto" :rules="rules" status-icon>
    <el-form-item label="手机号" prop="phone">
      <el-input placeholder="请输入手机号" v-model="phoneForm.phone" />
    </el-form-item>
    <el-form-item label="验证码" prop="code">
      <div class="verify-code-container">
        <el-input placeholder="请输入验证码" v-model="phoneForm.code" />
        <el-button
          type="primary"
          @click="handleGetVerifyCodeAction"
          :disabled="!isAllowGetVerifyCode"
          >{{
            verifyCodeStatus === VerifyCodeStatus.Default
              ? '获取验证码'
              : verifyCodeStatus === VerifyCodeStatus.Reset
                ? '重新发送'
                : `${countdown}秒后重新发送`
          }}</el-button
        >
      </div>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useUserInfoStore } from '@/stores/userinfo'
import type { IAccountByPhone } from '@/types'
import { ElMessage, type ElForm } from 'element-plus'
import router from '@/router'
import { getVerifyCode } from '@/service/apis/login'
const userInfoStore = useUserInfoStore()
const { loginByPhoneAction } = userInfoStore
const phoneFormRef = ref<InstanceType<typeof ElForm>>()
const phoneForm = reactive<IAccountByPhone>({
  phone: '',
  code: '',
})

// 获取验证码的三种状态
enum VerifyCodeStatus {
  Default, // 默认状态
  Reset, // 重新发送
  Expired, // 倒计时
}
const verifyCodeStatus = ref<VerifyCodeStatus>(VerifyCodeStatus.Default)
// 计算是否允许获取验证码
const isAllowGetVerifyCode = computed(() => {
  // 校验手机号是否正确
  if (
    /^1(3[0-9]|4[014-9]|5[0-9]|6[25-7]|7[0-8]|8[0-9]|9[0-9])\d{8}$/.test(phoneForm.phone) &&
    verifyCodeStatus.value !== VerifyCodeStatus.Expired
  ) {
    return true
  } else {
    return false
  }
})
const countdown = ref<number>(60)
const rules = reactive({
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    {
      pattern: /^1(3[0-9]|4[014-9]|5[0-9]|6[25-7]|7[0-8]|8[0-9]|9[0-9])\d{8}$/,
      message: '请输入正确的手机号',
      trigger: 'change',
    },
  ],
  code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
})
const handleGetVerifyCodeAction = async () => {
  try {
    await getVerifyCode(phoneForm.phone)
    ElMessage.success('验证码发送成功')
    verifyCodeStatus.value = VerifyCodeStatus.Expired
    const timer = setInterval(() => {
      countdown.value--
      if (countdown.value <= 0) {
        clearInterval(timer)
        verifyCodeStatus.value = VerifyCodeStatus.Reset
        countdown.value = 60
      }
    }, 1000)
  } catch (error) {
    console.log(error)
  }
}
const handleLoginAction = async () => {
  await phoneFormRef.value?.validate(async (valid) => {
    if (valid) {
      try {
        await loginByPhoneAction(phoneForm)
        ElMessage.success('登录成功')
        // 登录成功后，跳转到首页
        router.push({ name: 'Main' })
      } catch (error) {
        console.log(error)
      }
    } else {
      ElMessage.error('表单验证失败')
    }
  })
}
defineExpose({
  handleLoginAction,
})
</script>

<style scoped lang="less">
.verify-code-container {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
