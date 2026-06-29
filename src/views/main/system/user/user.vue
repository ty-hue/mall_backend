<template>
  <div class="user">
    <div class="search">
      <PageSearch ref="searchRef" @search="search" :searchConfig="searchConfig" />
    </div>
    <div class="content">
      <PageContent
        ref="contentRef"
        :load="loadPageData"
        :contentConfig="contentConfig"
        :modalConfig="modalConfig"
        :dataLists="dataLists"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import PageSearch from '@/components/page-search.vue'
import PageContent from '@/components/page-content.vue'
import { getPageList } from '@/service/apis/main.ts'
import { onMounted, reactive, ref } from 'vue'
import type { IRole } from '@/types/role.ts'
import type { IDepartment } from '@/types/department.ts'
import { searchConfig } from './config/search.config.ts'
import { contentConfig } from './config/content.config.ts'
import { modalConfig } from './config/modal.config.ts'

/** 泛型组件无法用 InstanceType，手动声明暴露接口 */
interface SearchExposed {
  formData: Record<string, unknown>
}
interface ContentExposed {
  pagination: { currentPage: number; pageSize: number }
  loadData: (isInit?: boolean, isSearch?: boolean) => void
}

const searchRef = ref<SearchExposed | null>(null)
const contentRef = ref<ContentExposed | null>(null)

const roleList = ref<IRole[]>([])
const departmentList = ref<IDepartment[]>([])
const dataLists = reactive({ roleList, departmentList })

const loadPageData = async <T extends Record<string, unknown>>(
  url: string,
  preCallback?: () => void,
  nextCallback?: (res: { list: T[]; total: number }) => void,
  isInit?: boolean,
  isAll?: boolean,
) => {
  preCallback?.()
  const res = await getPageList<T>(url, {
    ...(isAll ? {} : contentRef.value?.pagination),
    condition: isInit ? {} : (searchRef.value?.formData as Partial<T>),
  })
  nextCallback?.(res)
}

const search = () => contentRef.value?.loadData(false, true)

const loadSelectOptions = async () => {
  await loadPageData<IRole>(
    'role',
    () => {},
    (res) => {
      roleList.value = res.list
    },
    true,
    true,
  )
  await loadPageData<IDepartment>(
    'department',
    () => {},
    (res) => {
      departmentList.value = res.list
    },
    true,
    true,
  )
}

onMounted(() => loadSelectOptions())
</script>

<style lang="less" scoped>
.user {
  border-radius: 20px;
  overflow: hidden;
  .search {
    background-color: #fff;
    padding: 20px;
    margin-bottom: 20px;
  }
  .content {
    background-color: #fff;
    padding: 20px;
  }
}
</style>
