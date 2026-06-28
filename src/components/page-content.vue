<template>
  <div class="page-content">
    <div class="page-content-header">
      <div class="page-content-header-title">{{ contentConfig.title }}</div>
      <div class="page-content-header-btn">
        <el-button type="primary" size="large" @click="handleAdd">{{
          contentConfig.addBtnText
        }}</el-button>
      </div>
    </div>
    <div class="page-content-table">
      <el-table :data="tableData" border style="width: 100%">
        <template v-for="col in contentConfig.columns" :key="String(col.prop)">
          <el-table-column
            v-if="col.type === 'tag'"
            :prop="String(col.prop)"
            :label="col.label"
            :width="col.width"
            :align="col.align || 'center'"
          >
            <template #default="scope">
              <el-tag :type="(col.tagMap as any)?.[scope.row[String(col.prop)] as number]?.type">
                {{ (col.tagMap as any)?.[scope.row[String(col.prop)] as number]?.label }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            v-else-if="col.type === 'date'"
            :prop="String(col.prop)"
            :label="col.label"
            :width="col.width"
            :align="col.align || 'center'"
          >
            <template #default="scope">{{
              formatDate(scope.row[String(col.prop)] as string)
            }}</template>
          </el-table-column>
          <el-table-column
            v-else-if="col.type === 'slot'"
            :label="col.label"
            :width="col.width"
            :align="col.align || 'center'"
          >
            <template #default="scope"><slot :name="col.slotName" :row="scope.row" /></template>
          </el-table-column>
          <el-table-column
            v-else
            :prop="String(col.prop)"
            :label="col.label"
            :width="col.width"
            :align="col.align || 'center'"
          />
        </template>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope.row)" icon="edit"
              >编辑</el-button
            >
            <el-popconfirm
              :title="contentConfig.deleteConfirmText || '确认删除？'"
              @confirm="handleDelete(scope.row)"
            >
              <template #reference
                ><el-button type="danger" size="small" icon="delete">删除</el-button></template
              >
            </el-popconfirm>
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
    <PageModal
      ref="pageModalRef"
      :modalConfig="modalConfig"
      :dataLists="dataLists"
      @refresh="loadData"
    />
  </div>
</template>

<script setup lang="ts">
import { formatDate } from '@/utils/format'
import { onMounted, reactive, ref, type PropType } from 'vue'
import PageModal from '@/components/page-modal.vue'
import { deleteApi } from '@/service/apis/main.ts'
import type { IContentConfig } from '@/types/content-item'
import type { IModalConfig } from '@/types/modal-item'

type RowData = Record<string, unknown>

type LoadFn = (
  url: string,
  preCallback?: () => void,
  nextCallback?: (res: { list: RowData[]; total: number }) => void,
  isInit?: boolean,
  isAll?: boolean,
) => void

const props = defineProps({
  load: { type: Function as PropType<LoadFn>, required: true },
  contentConfig: {
    type: Object as PropType<IContentConfig<Record<string, unknown>>>,
    required: true,
  },
  modalConfig: { type: Object as PropType<IModalConfig>, required: true },
  dataLists: { type: Object as PropType<Record<string, RowData[]>>, default: () => ({}) },
})

const pagination = reactive({ currentPage: 1, pageSize: 10 })
const totalNum = ref(0)
const tableData = ref<RowData[]>([])
const pageModalRef = ref<InstanceType<typeof PageModal>>()

const handleEdit = (row: RowData) => pageModalRef.value?.handleOpenDialog(row, false)
const handleAdd = () => pageModalRef.value?.handleOpenDialog({} as RowData)

const handleDelete = async (row: RowData) => {
  await deleteApi(props.contentConfig.apiUrl, { id: row.id as number })
  loadData(true)
}

const loadData = (isInit?: boolean, isSearch = false) => {
  props.load(
    props.contentConfig.apiUrl,
    isSearch
      ? () => {
          pagination.currentPage = 1
          pagination.pageSize = 10
        }
      : undefined,
    (res) => {
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

onMounted(() => loadData(true))
defineExpose({ pagination, loadData })
</script>

<style lang="less" scoped>
.page-content {
  .page-content-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  .page-content-header-title {
    font-size: 1.375rem;
    font-weight: bold;
  }
  .pagination {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 24px;
  }
}
</style>
