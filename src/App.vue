<template>
  <div class="app">
    <ElConfigProvider :locale="zhCn">
      <router-view />
    </ElConfigProvider>
  </div>
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
</script>

<style lang="less" scoped>
.app {
  width: 100vw;
  height: 100vh;
  background-color: #f5f5f5;
}
</style>
