import { TOKEN_KEY } from '@/global/constant'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTokenStore = defineStore(
  'token',
  () => {
    const token = ref('')
    const setToken = async (value: string) => {
      token.value = value
    }
    const removeToken = async () => {
      token.value = ''
    }
    return {
      token,
      setToken,
      removeToken,
    }
  },
  {
    persist: {
      key: TOKEN_KEY,
    },
  },
)
