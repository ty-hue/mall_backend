<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside width="200px">
        <MainAside />
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import MainAside from '@/components/main-aside/main-aside.vue'
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
  .main-content {
    width: 100%;
    height: 100%;
    .el-aside {
      overflow-x: hidden;
      overflow-y: auto;
      line-height: 200px;
      text-align: left;
      cursor: pointer;
      background-color: #001529;
      transition: width 0.3s linear;
      scrollbar-width: none;
      &::-webkit-scrollbar {
        display: none;
      }
      -ms-overflow-style: none;
    }
    .el-main {
      background-color: #f0f2f5;
    }
  }
}
</style>
