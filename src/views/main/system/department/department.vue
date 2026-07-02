<template>
  <div class="department">
    <div class="search" v-if="isHasPermission.query">
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
import { searchConfig } from './config/search.config.ts'
import { contentConfig } from './config/content.config.ts'
import { modalConfig } from './config/modal.config.ts'

import { useSystemRootPageHook } from '@/hooks/useSystemRootPageHook.ts'

const { search, loadPageData, searchRef, contentRef, isHasPermission } = useSystemRootPageHook(
  contentConfig.apiUrl,
)
</script>

<style lang="less" scoped>
.department {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
