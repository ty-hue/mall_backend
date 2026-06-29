<template>
  <div class="page-search">
    <el-form :model="formData as any" ref="formRef" size="large">
      <el-row :gutter="20">
        <el-col :span="item.span" v-for="item in searchConfig" :key="item.prop">
          <el-form-item
            :label="item.label"
            :prop="String(item.prop)"
            :label-width="item.labelWidth"
          >
            <template v-if="item.type === 'input'">
              <el-input
                :model-value="(formData as any)[item.prop]"
                :placeholder="item.placeholder"
                @update:model-value="(v: string) => ((formData as any)[item.prop] = v)"
              />
            </template>
            <template v-else-if="item.type === 'select'">
              <el-select
                :model-value="(formData as any)[item.prop]"
                :placeholder="item.placeholder"
                @update:model-value="(v: number) => ((formData as any)[item.prop] = v)"
              >
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
                :model-value="(formData as any)[item.prop]"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @update:model-value="(v: string[]) => ((formData as any)[item.prop] = v)"
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

<script setup lang="ts" generic="T">
import type { IFormItem } from '@/types'
import type { ElForm } from 'element-plus'
import { ref } from 'vue'

const props = defineProps<{
  searchConfig: IFormItem<T>[]
}>()
const emit = defineEmits<{ search: [] }>()

const initialValue: Partial<T> = {}
for (const item of props.searchConfig) {
  initialValue[item.prop] = item.initialValue as T[keyof T]
}

console.log(initialValue)

const formData = ref<Partial<T>>(initialValue)
const formRef = ref<InstanceType<typeof ElForm>>()

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
