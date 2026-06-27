<template>
  <div class="page-search">
    <el-form :model="formData" ref="formRef" size="large">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="用户名" prop="name" label-width="150px">
            <el-input v-model="formData.name" placeholder="请输入用户名" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名" prop="realname" label-width="150px">
            <el-input v-model="formData.realname" placeholder="请输入真实姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="电话号码" prop="phone" label-width="150px">
            <el-input v-model="formData.phone" placeholder="请输入电话号码" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态" prop="enabled" label-width="150px">
            <el-select v-model="formData.enabled" placeholder="请选择状态">
              <el-option
                v-for="item in [0, 1]"
                :key="item"
                :label="item === 0 ? '禁用' : '启用'"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" prop="createAt" label-width="150px">
            <el-date-picker
              v-model="formData.createAt"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="" label-width="150px">
            <el-button
              type="info"
              size="large"
              icon="refresh"
              style="margin-right: 20px"
              @click="resetForm"
              >重置</el-button
            >
            <el-button type="primary" size="large" icon="search" @click="handleSearch"
              >查询</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { IUser } from '@/types/users'
import type { ElForm } from 'element-plus'
import { ref } from 'vue'
const formData = ref<Partial<IUser>>({})
const formRef = ref<InstanceType<typeof ElForm>>()
// 重置表单
const resetForm = () => {
  formRef.value?.resetFields()
}
const emit = defineEmits(['search'])
const handleSearch = () => {
  emit('search')
}

defineExpose({
  formData,
})
</script>

<style lang="less" scoped>
.page-search {
  .el-form-item--large {
    padding: 20px 0;
    margin-bottom: 0px;
  }
}
</style>
