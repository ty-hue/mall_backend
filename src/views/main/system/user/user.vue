<template>
  <div class="user">
    <div class="search">
      <PageSearch ref="searchRef" :load="loadPageData" @search="search" />
    </div>
    <div class="content">
      <PageContent
        ref="contentRef"
        :load="loadPageData"
        :roleList="roleList"
        :departmentList="departmentList"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import PageSearch from './c-cpns/page-search.vue'
import PageContent from './c-cpns/page-content.vue'
import { getPageList } from '@/service/apis/main.ts'
import { onMounted, ref } from 'vue'
import type { IRole } from '@/types/role.ts'
import type { IDepartment } from '@/types/department.ts'
const searchRef = ref<InstanceType<typeof PageSearch>>()
const contentRef = ref<InstanceType<typeof PageContent>>()
const loadPageData = async <T,>(
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

// 表单查询
const search = async () => {
  contentRef.value?.loadData(false, true)
}
const roleList = ref<IRole[]>([])
const departmentList = ref<IDepartment[]>([])

// 加载角色列表和部门列表
const loadRoleData = async () => {
  for (const url of ['role', 'department']) {
    await loadPageData<IRole>(
      url,
      () => {},
      (res: { list: IRole[] | IDepartment[]; total: number }) => {
        if (url === 'role') {
          roleList.value = res.list as IRole[]
        } else {
          departmentList.value = res.list as IDepartment[]
        }
      },
      true,
      true,
    )
  }
}
onMounted(() => {
  loadRoleData()
})
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
