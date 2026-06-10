<template>
  <div>
    <RouterLink to="/login">登陆页</RouterLink>
    <RouterLink to="/main">首页</RouterLink>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped></style>
