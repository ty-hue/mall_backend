<template>
  <div class="main-aside">
    <div class="logo">
      <img class="logo-img" src="@/assets/img/logo.svg" alt="" />
      <h1 class="title" v-show="!isExpanded">Ty-CMS</h1>
    </div>
    <div class="menu">
      <el-menu
        router
        :default-active="defaultActive"
        class="el-menu-vertical-demo"
        :background-color="'transparent'"
        :text-color="'var(--text-aside)'"
        :active-text-color="'var(--text-aside-active)'"
        :collapse="isExpanded"
      >
        <el-sub-menu :index="item.url!" v-for="item in menuList" :key="item.id">
          <template #title>
            <el-icon>
              <component :is="item.icon?.split('-icon-')[1]" />
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item :index="child.url!" v-for="child in item.children" :key="child.id">
            {{ child.name }}
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMenuStore } from '@/stores/menu'
import { useLayoutStore } from '@/stores/layout'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
const menuStore = useMenuStore()
const { menuList } = storeToRefs(menuStore)
const layoutStore = useLayoutStore()
const { isExpanded } = storeToRefs(layoutStore)
const defaultActive = ref('')
const route = useRoute()
watch(
  () => route.path,
  (newPath) => {
    defaultActive.value = newPath
  },
  { immediate: true },
)
</script>

<style lang="less" scoped>
.main-aside {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-aside);
  border-right: 1px solid var(--border-light);
  transition:
    background-color var(--transition),
    border-color var(--transition);

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 64px;
    padding: 0 16px;
    border-bottom: 1px solid var(--border-light);

    .logo-img {
      width: 36px;
      height: 36px;
      object-fit: contain;
    }
    .title {
      margin-left: 10px;
      font-size: 16px;
      font-weight: 700;
      color: var(--text-primary);
      white-space: nowrap;
      letter-spacing: 1px;
    }
  }

  .menu {
    flex: 1;
    overflow-y: auto;

    .el-menu {
      border-right: none;
      user-select: none;

      .el-sub-menu {
        .el-menu-item {
          padding-left: 50px !important;
          background-color: var(--bg-aside-sub);
          transition:
            background-color var(--transition),
            color var(--transition);
        }
        .el-menu-item:hover {
          background-color: var(--bg-aside-sub) !important;
        }
        .el-menu-item.is-active {
          background-color: var(--bg-aside-active) !important;
        }
      }
    }
  }
}
</style>
