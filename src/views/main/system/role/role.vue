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
        :treeData="treeData"
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
import { onMounted, ref } from 'vue'
import type { MenuItem } from '@/types/login.js'
const { search, loadPageData, searchRef, contentRef } = useSystemRootPageHook()

// 菜单树数据
const treeData = ref<MenuItem[]>([])

onMounted(() => {
  loadPageData(
    'menu',
    () => {},
    (res) => {
      treeData.value = res.list as MenuItem[]
    },
    true,
    true,
  )
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
