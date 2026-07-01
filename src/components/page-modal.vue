<template>
  <el-dialog
    v-model="dialogVisible"
    :title="(isAddRef ? '新建' : '编辑') + modalConfig.entityName"
    width="500"
  >
    <el-form :model="form as any" label-width="auto" style="max-width: 600px">
      <template v-for="field in modalConfig.fields" :key="field.prop">
        <el-form-item v-if="field.onlyOnAdd && !isAddRef" v-show="false" />
        <el-form-item v-else :label="field.label">
          <template v-if="field.type === 'input'">
            <el-input
              :model-value="(form as any)[field.prop]"
              :placeholder="field.placeholder"
              @update:model-value="(v: string) => ((form as any)[field.prop] = v)"
            />
          </template>
          <template v-else-if="field.type === 'password'">
            <el-input
              :model-value="(form as any)[field.prop]"
              type="password"
              :placeholder="field.placeholder"
              @update:model-value="(v: string) => ((form as any)[field.prop] = v)"
            />
          </template>
          <template v-else-if="field.type === 'switch'">
            <el-switch
              :model-value="(form as any)[field.prop]"
              :active-value="field.activeValue ?? 1"
              :inactive-value="field.inactiveValue ?? 0"
              @update:model-value="(v: any) => ((form as any)[field.prop] = v)"
            />
          </template>
          <template v-else-if="field.type === 'select'">
            <el-select
              :model-value="(form as any)[field.prop]"
              :placeholder="field.placeholder"
              @update:model-value="(v: number) => ((form as any)[field.prop] = v)"
            >
              <el-option
                v-for="item in (dataLists ?? {})[field.listKey ?? ''] ?? []"
                :key="(item as any)[field.optionValue ?? 'id']"
                :label="(item as any)[field.optionLabel ?? 'name']"
                :value="(item as any)[field.optionValue ?? 'id']"
              />
            </el-select>
          </template>
          <template v-else-if="field.type === 'tree'">
            <el-tree
              ref="treeRef"
              style="max-width: 600px"
              :data="treeData as TreeNodeData[]"
              show-checkbox
              :default-expand-all="false"
              :node-key="modalConfig.childrenTree?.rowKey"
              highlight-current
              @check="(checks, checkStatus) => handleCheck(field.prop, checkStatus)"
              :props="modalConfig.childrenTree?.treeProps"
            />
          </template>
        </el-form-item>
      </template>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts" generic="T, V">
import { addApi, updateApi } from '@/service/apis/main'
import { nextTick, ref } from 'vue'
import type { IModalConfig } from '@/types/modal-item'
import type { TreeNodeData } from 'element-plus'
import type { CheckedInfo } from 'element-plus'
import { ElTree } from 'element-plus'
const props = defineProps<{
  modalConfig: IModalConfig<T>
  dataLists?: Record<string, Record<string, unknown>[]>
  treeData?: V[]
}>()

const emit = defineEmits<{ refresh: [] }>()

const dialogVisible = ref(false)
const isAddRef = ref(true)
const form = ref<Partial<T>>({})
const treeRef = ref<InstanceType<typeof ElTree>[]>([])

const handleOpenDialog = (data: T, isAdd = true) => {
  dialogVisible.value = true
  form.value = { ...data }
  isAddRef.value = isAdd
}

const handleSetCheckedKeys = async (permissions: number[]) => {
  await nextTick()
  const tree = treeRef.value[0]
  if (tree) tree.setCheckedKeys(permissions)
}

const handleSubmit = async () => {
  if (isAddRef.value) await addApi(props.modalConfig.apiUrl, form.value as Record<string, unknown>)
  else
    await updateApi(
      props.modalConfig.apiUrl,
      { id: form.value.id as number },
      form.value as Record<string, unknown>,
    )
  emit('refresh')
  dialogVisible.value = false
}
const handleCheck = (key: keyof T, checkStatus: CheckedInfo) => {
  const { checkedKeys, halfCheckedKeys } = checkStatus
  const allCheckedList = [...checkedKeys, ...halfCheckedKeys]
  form.value[key] = allCheckedList
}

defineExpose({ handleOpenDialog, handleSetCheckedKeys })
</script>
