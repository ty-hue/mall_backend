<template>
  <el-dialog
    v-model="dialogVisible"
    :title="(isAddRef ? '新建' : '编辑') + modalConfig.entityName"
    width="500"
  >
    <el-form :model="form" label-width="auto" style="max-width: 600px">
      <template v-for="field in modalConfig.fields" :key="field.prop">
        <el-form-item v-if="field.onlyOnAdd && !isAddRef" v-show="false" />
        <el-form-item v-else :label="field.label">
          <template v-if="field.type === 'input'">
            <el-input v-model="form[field.prop] as string" :placeholder="field.placeholder" />
          </template>

          <template v-else-if="field.type === 'password'">
            <el-input
              v-model="form[field.prop] as string"
              type="password"
              :placeholder="field.placeholder"
            />
          </template>
          <template v-else-if="field.type === 'switch'">
            <el-switch
              v-model="form[field.prop] as number"
              :active-value="field.activeValue ?? 1"
              :inactive-value="field.inactiveValue ?? 0"
            />
          </template>
          <template v-else-if="field.type === 'select'">
            <el-select v-model="form[field.prop] as number" :placeholder="field.placeholder">
              <el-option
                v-for="item in dataLists[field.listKey ?? ''] ?? []"
                :key="(item as any)[field.optionValue ?? 'id']"
                :label="(item as any)[field.optionLabel ?? 'name']"
                :value="(item as any)[field.optionValue ?? 'id']"
              />
            </el-select>
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

<script setup lang="ts">
import { addApi, updateApi } from '@/service/apis/main'
import { ref, type PropType } from 'vue'
import type { IModalConfig } from '@/types/modal-item'

type RowData = Record<string, unknown>

const props = defineProps({
  modalConfig: { type: Object as PropType<IModalConfig>, required: true },
  dataLists: { type: Object as PropType<Record<string, RowData[]>>, default: () => ({}) },
})

const emit = defineEmits(['refresh'])

const dialogVisible = ref(false)
const isAddRef = ref(true)
const form = ref<RowData>({})

const handleOpenDialog = (data: RowData, isAdd = true) => {
  dialogVisible.value = true
  form.value = { ...data }
  isAddRef.value = isAdd
}

const handleSubmit = async () => {
  if (isAddRef.value) await addApi(props.modalConfig.apiUrl, form.value)
  else await updateApi(props.modalConfig.apiUrl, { id: form.value.id as number }, form.value)
  emit('refresh')
  dialogVisible.value = false
}

defineExpose({ handleOpenDialog })
</script>
