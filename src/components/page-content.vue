<template>
  <div class="page-content">
    <div class="page-content-header">
      <div class="page-content-header-title">{{ contentConfig.title }}</div>
      <div class="page-content-header-btn" v-if="isHasPermission.create">
        <el-button type="primary" size="large" @click="handleAdd">{{
          contentConfig.addBtnText
        }}</el-button>
      </div>
    </div>
    <div class="page-content-table">
      <el-table
        :data="tableData as Record<string, unknown>[]"
        border
        style="width: 100%"
        v-bind="contentConfig.childrenTree || {}"
      >
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
          <el-table-column
            v-else-if="col.type === 'handler' && (isHasPermission.update || isHasPermission.delete)"
            :label="col.label"
            align="center"
          >
            <template #default="scope">
              <el-button
                v-if="isHasPermission.update"
                type="primary"
                size="small"
                @click="handleEdit(scope.row)"
                icon="edit"
                >编辑</el-button
              >
              <el-popconfirm
                v-if="isHasPermission.delete"
                :title="contentConfig.deleteConfirmText || '确认删除？'"
                @confirm="handleDelete(scope.row)"
              >
                <template #reference
                  ><el-button v-if="isHasPermission.delete" type="danger" size="small" icon="delete"
                    >删除</el-button
                  ></template
                >
              </el-popconfirm>
            </template>
          </el-table-column>
          <el-table-column
            v-else-if="col.type !== 'handler'"
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
      :treeData="treeData"
    />
  </div>
</template>

<script setup lang="ts" generic="T, U, V">
import { formatDate } from '@/utils/format'
import { onMounted, reactive, ref } from 'vue'
import PageModal from '@/components/page-modal.vue'
import { deleteApi } from '@/service/apis/main.ts'
import type { IContentConfig } from '@/types/content-item'
import type { IModalConfig } from '@/types/modal-item'
import useIsHasPermissionHook from '@/hooks/useIsHasPermissionHook'
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
  treeData?: V[]
}>()

const pagination = reactive({ currentPage: 1, pageSize: 10 })
const totalNum = ref(0)
const tableData = ref<T[]>([])

/** 泛型组件无法用 InstanceType，手动声明暴露接口 */
interface PageModalExposed {
  handleOpenDialog: (data: Record<string, unknown>, isAdd?: boolean) => void
  handleSetCheckedKeys: (permissions: number[]) => void
}

const pageModalRef = ref<PageModalExposed | null>(null)

const handleEdit = (row: T) => {
  pageModalRef.value?.handleOpenDialog(row as unknown as Record<string, unknown>, false)
  pageModalRef.value?.handleSetCheckedKeys(
    (row as unknown as Record<string, unknown>)['permissions'] as number[],
  )
}
const handleAdd = () => {
  pageModalRef.value?.handleOpenDialog({} as Record<string, unknown>)
  pageModalRef.value?.handleSetCheckedKeys([])
}

const handleDelete = async (row: T) => {
  await deleteApi(props.contentConfig.apiUrl, {
    id: (row as unknown as Record<string, unknown>).id as number,
  })
  await loadData()
}

const loadData = async (isInit?: boolean, isSearch = false) => {
  await props.load(
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
const isHasPermission = useIsHasPermissionHook(props.contentConfig.apiUrl, [
  'create',
  'delete',
  'update',
  'query',
])
defineExpose({ pagination, loadData })
</script>

<style lang="less" scoped>
.page-content {
  flex: 1;
  background-color: var(--bg-card);
  padding: 20px;
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-card);
  transition:
    background-color var(--transition),
    box-shadow var(--transition);

  .page-content-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--border-light);
    transition: border-color var(--transition);
  }
  .page-content-header-title {
    font-size: 17px;
    font-weight: 600;
    color: var(--text-primary);
    transition: color var(--transition);
  }
  .pagination {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 20px;
    padding-top: 16px;
    border-top: 1px solid var(--border-light);
    transition: border-color var(--transition);
  }
}
</style>
