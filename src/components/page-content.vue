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
            v-else-if="col.type === 'custom'"
            :label="col.label"
            :width="col.width"
            :align="col.align || 'center'"
          >
            <template #default="scope"><slot :name="col.slotName" :row="scope.row" /></template>
          </el-table-column>
          <el-table-column v-else-if="col.type === 'handler'" :label="col.label" align="center">
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
          <el-table-column
            v-else
            :prop="String(col.prop)"
            :label="col.label"
            :width="col.width"
            :align="col.align || 'center'"
          />
        </template>
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
      @refresh="loadData()"
    />
  </div>
</template>

<script
  setup
  lang="ts"
  generic="T extends Record<string, unknown>, U extends Record<string, unknown>"
>
import { formatDate } from '@/utils/format'
import { onMounted, reactive, ref } from 'vue'
import PageModal from '@/components/page-modal.vue'
import { deleteApi } from '@/service/apis/main.ts'
import type { IContentConfig } from '@/types/content-item'
import type { IModalConfig } from '@/types/modal-item'

const props = defineProps<{
  load: (
    url: string,
    preCallback?: () => void,
    nextCallback?: (res: { list: T[]; total: number }) => void,
    isInit?: boolean,
    isAll?: boolean,
  ) => void
  contentConfig: IContentConfig<T>
  modalConfig: IModalConfig<U>
  dataLists?: Record<string, Record<string, unknown>[]>
}>()

const pagination = reactive({ currentPage: 1, pageSize: 10 })
const totalNum = ref(0)
const tableData = ref<T[]>([])

/** 泛型组件无法用 InstanceType，手动声明暴露接口 */
interface PageModalExposed {
  handleOpenDialog: (data: Record<string, unknown>, isAdd?: boolean) => void
}

const pageModalRef = ref<PageModalExposed | null>(null)

const handleEdit = (row: T) => {
  pageModalRef.value?.handleOpenDialog(row as unknown as Record<string, unknown>, false)
}
const handleAdd = () => {
  pageModalRef.value?.handleOpenDialog({} as Record<string, unknown>)
}

const handleDelete = async (row: T) => {
  await deleteApi(props.contentConfig.apiUrl, { id: row.id as number })
  loadData()
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
  await loadData()
}
const handleSizeChange = async (val: number) => {
  pagination.pageSize = val
  await loadData()
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
