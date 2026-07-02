<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="asideWidth">
        <MainAside />
      </el-aside>
      <el-container>
        <el-header>
          <MainHeader />
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import MainAside from '@/components/main-aside/main-aside.vue'
import MainHeader from '@/components/main-header/main-header.vue'
import { useLayoutStore } from '@/stores/layout'
import { storeToRefs } from 'pinia'
const layoutStore = useLayoutStore()
const { asideWidth } = storeToRefs(layoutStore)
</script>

<style lang="less" scoped>
.main {
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .main-content {
    width: 100%;
    height: 100%;

    .el-aside {
      height: 100vh;
      overflow-x: hidden;
      overflow-y: auto;
      cursor: pointer;
      background-color: var(--bg-aside);
      transition:
        width 0.3s ease-in-out,
        background-color var(--transition);
      scrollbar-width: none;
      &::-webkit-scrollbar {
        display: none;
      }
      -ms-overflow-style: none;
    }

    > .el-container {
      height: 100vh;
      overflow: hidden;

      .el-header {
        flex-shrink: 0;
        background-color: var(--bg-card);
        border-bottom: 1px solid var(--border-color);
        transition:
          background-color var(--transition),
          border-color var(--transition);
      }

      .el-main {
        flex: 1;
        overflow-y: auto;
        background-color: var(--bg-page);
        transition: background-color var(--transition);
      }
    }
  }
}
</style>
