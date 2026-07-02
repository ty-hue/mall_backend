<template>
  <div class="menu">
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
import PageContent from '@/components/page-content.vue'
import { contentConfig } from './config/content.config.ts'
import { modalConfig } from './config/modal.config.ts'

import { useSystemRootPageHook } from '@/hooks/useSystemRootPageHook.ts'

const { loadPageData, contentRef } = useSystemRootPageHook(contentConfig.apiUrl)
</script>

<style lang="less" scoped>
.menu {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
