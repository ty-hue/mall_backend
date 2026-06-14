<template>
  <div class="main-header">
    <div class="expanded" @click="toggleExpanded">
      <el-icon size="30">
        <component :is="isExpanded ? 'expand' : 'fold'" />
      </el-icon>
    </div>
    <div class="content">
      <header-breadcrumb />
      <div class="info">
        <header-info />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderBreadcrumb from './c-cpns/header-breadcrumb.vue'
import { useLayoutStore } from '@/stores/layout'
import HeaderInfo from './c-cpns/header-info.vue'
import { storeToRefs } from 'pinia'
const layoutStore = useLayoutStore()
const { isExpanded } = storeToRefs(layoutStore)
const { toggleExpanded } = layoutStore
</script>

<style lang="less" scoped>
.main-header {
  height: 100%;
  display: flex;
  align-items: center;
  .expanded {
    cursor: pointer;
  }
  .content {
    margin-left: 20px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
