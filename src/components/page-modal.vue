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

<script setup lang="ts" generic="T">
import { addApi, updateApi } from '@/service/apis/main'
import { ref } from 'vue'
import type { IModalConfig } from '@/types/modal-item'

const props = defineProps<{
  modalConfig: IModalConfig<T>
  dataLists?: Record<string, Record<string, unknown>[]>
}>()

const emit = defineEmits<{ refresh: [] }>()

const dialogVisible = ref(false)
const isAddRef = ref(true)
const form = ref<Partial<T>>({})

const handleOpenDialog = (data: T, isAdd = true) => {
  dialogVisible.value = true
  form.value = { ...data }
  isAddRef.value = isAdd
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

defineExpose({ handleOpenDialog })
</script>
