<template>
  <div class="breadcrumb">
    <el-breadcrumb separator-icon="ArrowRight">
      <el-breadcrumb-item
        v-for="item in breadcrumbList"
        :key="item.id"
        :title="item.name"
        :to="{ path: item.url || '/' }"
        >{{ item.name }}</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import type { BaseMenuItem } from '@/types'
import menuToBreadcrumbMap from '@/utils/menu-to-breadcrumb-map'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useMenuStore } from '@/stores/menu'
import { storeToRefs } from 'pinia'
const menuStore = useMenuStore()
const { menuList } = storeToRefs(menuStore)
const breadcrumbList = ref<BaseMenuItem[]>([])

const route = useRoute()
watch(
  () => route.path,
  (newPath) => {
    breadcrumbList.value = menuToBreadcrumbMap(menuList.value, newPath)
  },
  { immediate: true },
)
</script>

<style lang="less" scoped></style>
