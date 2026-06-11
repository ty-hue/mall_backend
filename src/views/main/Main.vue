<template>
  <div class="main">首页 {{ userInfo.name }}</div>
</template>

<script setup lang="ts">
import { useUserInfoStore } from '@/stores/userinfo'
import { storeToRefs } from 'pinia'
const userInfoStore = useUserInfoStore()
const { userInfo } = storeToRefs(userInfoStore)
</script>

<style lang="less" scoped>
.main {
}
</style>
