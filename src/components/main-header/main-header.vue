<template>
  <div class="main-header">
    <div class="expanded" @click="toggleExpanded">
      <el-icon size="22" color="var(--text-secondary)">
        <component :is="isExpanded ? 'Expand' : 'Fold'" />
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
    display: flex;
    align-items: center;
    padding: 4px;
    border-radius: 4px;
    transition: background-color var(--transition);

    &:hover {
      background-color: var(--border-light);
    }
  }

  .content {
    margin-left: 16px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
