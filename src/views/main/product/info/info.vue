<template>
  <div class="product-info">
    <div class="info-card">
      <el-icon :size="48" color="#e6a23c"><Goods /></el-icon>
      <h2>商品列表</h2>
      <p>功能开发中，敬请期待...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Goods } from '@element-plus/icons-vue'
</script>

<style lang="less" scoped>
.product-info {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  .info-card {
    text-align: center;
    background-color: var(--bg-card);
    padding: 64px 80px;
    border-radius: var(--radius-card);
    box-shadow: var(--shadow-card);
    transition:
      background-color var(--transition),
      box-shadow var(--transition);

    h2 {
      margin-top: 16px;
      font-size: 20px;
      color: var(--text-primary);
      transition: color var(--transition);
    }

    p {
      margin-top: 8px;
      font-size: 14px;
      color: var(--text-secondary);
      transition: color var(--transition);
    }
  }
}
</style>
