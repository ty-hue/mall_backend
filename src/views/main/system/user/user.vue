<template>
  <div class="user">
    <div class="search" v-if="isHasPermission.query">
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
import { onMounted, reactive, ref } from 'vue'
import type { IRole } from '@/types/role.ts'
import type { IDepartment } from '@/types/department.ts'
import { searchConfig } from './config/search.config.ts'
import { contentConfig } from './config/content.config.ts'
import { modalConfig } from './config/modal.config.ts'

import { useSystemRootPageHook } from '@/hooks/useSystemRootPageHook.ts'

const { search, loadPageData, searchRef, contentRef, isHasPermission } = useSystemRootPageHook(
  contentConfig.apiUrl,
)

const roleList = ref<IRole[]>([])
const departmentList = ref<IDepartment[]>([])
const dataLists = reactive({ roleList, departmentList })
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
