<template>
  <div class="department">
    <div class="search">
      <PageSearch ref="searchRef" @search="search" :searchConfig="searchConfig" />
    </div>
    <div class="content">
      <PageContent
        ref="contentRef"
        :load="loadPageData"
        :contentConfig="contentConfig"
        :modalConfig="modalConfig"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import PageSearch from '@/components/page-search.vue'
import PageContent from '@/components/page-content.vue'
import { getPageList } from '@/service/apis/main.ts'
import { ref } from 'vue'
import { searchConfig } from './config/search.config.ts'
import { contentConfig } from './config/content.config.ts'
import { modalConfig } from './config/modal.config.ts'

const searchRef = ref<InstanceType<typeof PageSearch>>()
const contentRef = ref<InstanceType<typeof PageContent>>()

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
</script>

<style lang="less" scoped>
.department {
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
