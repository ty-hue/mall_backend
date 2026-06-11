import { getUserInfoById, login } from '@/service/apis/login'
import type { IAccount, IUserInfo } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useTokenStore } from './token'
import { USERINFO_KEY } from '@/global/constant'
export const useUserInfoStore = defineStore(
  'userinfo',
  () => {
    const userInfo = ref<IUserInfo>({} as IUserInfo)
    // 登录操作
    const loginAction = async (account: IAccount) => {
      const res = await login(account)
      await useTokenStore().setToken(res.token)
      // 登录成功后，获取用户信息
      const userInfoRes = await getUserInfoById(res.id)
      userInfo.value = userInfoRes
    }
    // 退出登录操作
    const loginoutAction = async () => {
      await useTokenStore().removeToken()
      userInfo.value = {} as IUserInfo
    }
    return {
      userInfo,
      loginAction,
      loginoutAction,
    }
  },
  {
    persist: {
      key: USERINFO_KEY,
    },
  },
)
