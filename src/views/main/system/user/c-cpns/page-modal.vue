<template>
  <el-dialog v-model="dialogVisible" :title="isAddRef ? '新建用户' : '编辑用户'" width="500">
    <el-form :model="form" label-width="auto" style="max-width: 600px">
      <el-form-item label="用户名">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="真实姓名">
        <el-input v-model="form.realname" />
      </el-form-item>
      <el-form-item v-if="isAddRef" label="密码">
        <el-input v-model="form.password" />
      </el-form-item>
      <el-form-item label="电话号码">
        <el-input v-model="form.phone" />
      </el-form-item>
      <el-form-item label="状态">
        <el-switch v-model="form.enabled" :active-value="1" :inactive-value="0" />
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="form.roleId" placeholder="请选择角色">
          <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门">
        <el-select v-model="form.departmentId" placeholder="请选择部门">
          <el-option
            v-for="item in departmentList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import type { IDepartment } from '@/types/department'
import type { IRole } from '@/types/role'
import type { IUser } from '@/types/users'
import { ref, type PropType } from 'vue'

const dialogVisible = ref(false)
const isAddRef = ref(true)
const handleOpenDialog = (data: IUser, isAdd: boolean = true) => {
  dialogVisible.value = true
  form.value = data
  isAddRef.value = isAdd
}

const form = ref<Partial<IUser & { password: string }>>({})

defineProps({
  roleList: {
    type: Array as PropType<IRole[]>,
    required: true,
  },
  departmentList: {
    type: Array as PropType<IDepartment[]>,
    required: true,
  },
})

defineExpose({
  handleOpenDialog,
})
</script>

<style lang="less" scoped></style>
