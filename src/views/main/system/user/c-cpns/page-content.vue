<template>
  <div class="page-content">
    <div class="page-content-header">
      <div class="page-content-header-title">用户列表</div>
      <div class="page-content-header-btn">
        <el-button type="primary" size="large" @click="handleAdd">新建用户</el-button>
      </div>
    </div>
    <div class="page-content-table">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="序号" width="55" align="center" />
        <el-table-column prop="name" label="用户名" width="180" align="center" />
        <el-table-column prop="realname" label="真实姓名" width="180" align="center" />
        <el-table-column prop="phone" label="电话号码" align="center" />
        <el-table-column prop="enabled" label="状态" align="center">
          <template #default="scope">
            <el-tag :type="scope.row.enabled === 0 ? 'danger' : 'success'">
              {{ scope.row.enabled === 0 ? '禁用' : '启用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createAt" label="创建时间" align="center">
          <template #default="scope">
            {{ formatDate(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column prop="updateAt" label="更新时间" align="center">
          <template #default="scope">
            {{ formatDate(scope.row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              @click="handleEdit(scope.row as IUser)"
              icon="edit"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="small"
              @click="handleDelete(scope.row as IUser)"
              icon="delete"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          v-model:current-page="pagination.currentPage"
          v-model:page-size="pagination.pageSize"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalNum"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </div>
    </div>
    <PageModal ref="pageModalRef" :roleList="roleList" :departmentList="departmentList" />
  </div>
</template>

<script setup lang="ts">
import type { IUser } from '@/types/users'
import { formatDate } from '@/utils/format'
import { onMounted, reactive, ref, type PropType } from 'vue'
import PageModal from './page-modal.vue'
import type { IRole } from '@/types/role.ts'
import type { IDepartment } from '@/types/department.ts'

const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
})
const totalNum = ref(0)

const tableData = ref<IUser[]>([])
const pageModalRef = ref<InstanceType<typeof PageModal>>()

const handleEdit = (user: IUser) => {
  pageModalRef.value?.handleOpenDialog(user, false)
}

const handleDelete = (user: IUser) => {
  console.log(user)
}

const handleAdd = () => {
  pageModalRef.value?.handleOpenDialog({} as IUser)
}

const props = defineProps({
  load: {
    type: Function as PropType<
      <T>(
        url: string,
        preCallback?: () => void,
        nextCallback?: (res: { list: T[]; total: number }) => void,
        isInit?: boolean,
        isAll?: boolean,
      ) => void
    >,
    required: true,
  },
  roleList: {
    type: Array as PropType<IRole[]>,
    required: true,
  },
  departmentList: {
    type: Array as PropType<IDepartment[]>,
    required: true,
  },
})

const loadData = (isInit?: boolean, isSearch: boolean = false) => {
  props.load<IUser>(
    'user',
    isSearch
      ? () => {
          pagination.currentPage = 1
          pagination.pageSize = 10
        }
      : () => {},
    (res: { list: IUser[]; total: number }) => {
      tableData.value = res.list
      totalNum.value = res.total
    },
    isInit,
  )
}

const handleCurrentChange = async (val: number) => {
  pagination.currentPage = val
  await loadData(false)
}

const handleSizeChange = async (val: number) => {
  pagination.pageSize = val
  await loadData(false)
}

onMounted(() => {
  loadData(true)
})
defineExpose({
  pagination,
  loadData,
})
</script>

<style lang="less" scoped>
.page-content {
  .page-content-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    .page-content-header-title {
      font-size: 1.375rem;
      font-weight: bold;
    }
  }
  .pagination {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 24px;
  }
}
</style>
