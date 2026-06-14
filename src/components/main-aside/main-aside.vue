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
        active-text-color="#fff"
        text-color="#b7bdc3"
        background-color="#001529"
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
// 根据当前页面路径匹配菜单激活项
const defaultActive = ref('')
const route = useRoute()
// 监听路由变化，更新默认选中项
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
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
    font-size: 14px;
    font-weight: bold;
    color: #fff;
    .logo-img {
      width: 56px;
      height: 56px;
      object-fit: fill;
    }
    .title {
      margin-left: 10px;
    }
  }
  .menu {
    flex: 1;
    .el-menu {
      border-right: none;
      border-radius: none;
      user-select: none;
      .el-sub-menu {
        .el-menu-item {
          padding-left: 50px !important;
          background-color: #0c2135;
        }
        .el-menu-item:hover {
          color: #fff !important;
        }
        .el-menu-item.is-active {
          background-color: #0a60bd;
        }
      }
    }
  }
}
</style>

<style></style>
