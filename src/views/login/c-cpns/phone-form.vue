<template>
  <el-form ref="phoneFormRef" label-width="auto" status-icon>
    <el-form-item label="手机号" prop="phone">
      <el-input placeholder="请输入手机号" />
    </el-form-item>
    <el-form-item label="验证码" prop="code">
      <el-input placeholder="请输入验证码" />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts"></script>
