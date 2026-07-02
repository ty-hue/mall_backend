<template>
  <div class="not-found">
    <div class="not-found-content">
      <h1 class="code">404</h1>
      <p class="desc">抱歉，您访问的页面不存在</p>
      <el-button type="primary" @click="$router.push('/main')">返回首页</el-button>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.not-found {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-page);
  transition: background-color var(--transition);

  .not-found-content {
    text-align: center;

    .code {
      font-size: 96px;
      font-weight: 700;
      color: var(--text-placeholder);
      letter-spacing: 8px;
      margin-bottom: 16px;
      transition: color var(--transition);
    }

    .desc {
      font-size: 16px;
      color: var(--text-secondary);
      margin-bottom: 32px;
      transition: color var(--transition);
    }
  }
}
</style>
