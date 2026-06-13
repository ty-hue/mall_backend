import { defineStore } from 'pinia'
import { ref } from 'vue'
import { THEME_MODE_KEY } from '@/global/constant'

export const useThemeStore = defineStore(
  'theme',
  () => {
    const themeMode = ref<boolean>(false) // 主题模式 false: 暗黑模式 true: 光明模式
    return {
      themeMode,
    }
  },
  {
    persist: {
      key: THEME_MODE_KEY,
    },
  },
)
