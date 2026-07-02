<template>
  <div class="product-kind">
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
import type { ICategory } from '@/types/category'
import { searchConfig } from './config/search.config.ts'
import { contentConfig } from './config/content.config.ts'
import { modalConfig } from './config/modal.config.ts'

import { useSystemRootPageHook } from '@/hooks/useSystemRootPageHook.ts'

const { search, loadPageData, searchRef, contentRef, isHasPermission } =
  useSystemRootPageHook(contentConfig.apiUrl, 'product', 'kind')

const categoryList = ref<ICategory[]>([])
const dataLists = reactive({ categoryList })
const loadSelectOptions = async () => {
  await loadPageData<ICategory>(
    'category',
    () => {},
    (res) => {
      categoryList.value = res.list
    },
    true,
    true,
  )
}

onMounted(() => loadSelectOptions())
</script>

<style lang="less" scoped>
.product-kind {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
