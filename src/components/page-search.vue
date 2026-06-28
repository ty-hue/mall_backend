<template>
  <div class="page-search">
    <el-form :model="formData" ref="formRef" size="large">
      <el-row :gutter="20">
        <el-col :span="item.span" v-for="item in searchConfig" :key="item.prop">
          <el-form-item
            :label="item.label"
            :prop="String(item.prop)"
            :label-width="item.labelWidth"
          >
            <template v-if="item.type === 'input'">
              <el-input v-model="formData[item.prop] as string" :placeholder="item.placeholder" />
            </template>
            <template v-else-if="item.type === 'select'">
              <el-select v-model="formData[item.prop] as number" :placeholder="item.placeholder">
                <el-option
                  v-for="option in item.options"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                />
              </el-select>
            </template>
            <template v-else-if="item.type === 'date-picker'">
              <el-date-picker
                v-model="formData[item.prop] as string[]"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </template>
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
import type { IFormItem } from '@/types'
import type { ElForm } from 'element-plus'
import { ref, type PropType } from 'vue'

type RowData = Record<string, unknown>

const props = defineProps({
  searchConfig: { type: Array as PropType<IFormItem<RowData>[]>, required: true },
})
const emit = defineEmits(['search'])

const initialValue: RowData = {}
for (const item of props.searchConfig) {
  initialValue[item.prop] = item.initialValue
}

const formData = ref<Partial<RowData>>(initialValue)
const formRef = ref<InstanceType<typeof ElForm>>()
// 重置表单
const resetForm = () => {
  formRef.value?.resetFields()
}
const handleSearch = () => {
  emit('search')
}

defineExpose({ formData })
</script>

<style lang="less" scoped>
.page-search {
  .el-form-item--large {
    padding: 20px 0;
    margin-bottom: 0px;
  }
}
</style>
