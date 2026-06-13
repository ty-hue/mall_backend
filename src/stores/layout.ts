import { LAYOUT_KEY } from '@/global/constant'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useLayoutStore = defineStore(
  'layout',
  () => {
    const isExpanded = ref(true)
    // 侧边栏宽度
    const asideWidth = computed(() => (!isExpanded.value ? '200px' : '63px'))
    const toggleExpanded = () => {
      isExpanded.value = !isExpanded.value
    }
    return {
      isExpanded,
      toggleExpanded,
      asideWidth,
    }
  },
  {
    persist: {
      key: LAYOUT_KEY,
    },
  },
)
