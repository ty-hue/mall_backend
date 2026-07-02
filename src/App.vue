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
import { useThemeStore } from '@/stores/theme'
import { storeToRefs } from 'pinia'
import { watch, onMounted } from 'vue'

const themeStore = useThemeStore()
const { themeMode } = storeToRefs(themeStore)

const applyTheme = (dark: boolean) => {
  document.documentElement.classList.toggle('dark', dark)
}

onMounted(() => applyTheme(themeMode.value))
watch(themeMode, (val) => applyTheme(val), { immediate: true })
</script>
