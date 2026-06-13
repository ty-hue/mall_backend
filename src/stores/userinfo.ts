import { getUserInfoById, login, loginByPhone } from '@/service/apis/login'
import type { IAccount, IAccountByPhone, IUserInfo } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useTokenStore } from './token'
import { USERINFO_KEY } from '@/global/constant'
import { useMenuStore } from './menu'
import router from '@/router'
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
      // 登录成功后，获取菜单
      await useMenuStore().getMenuList(userInfoRes.role.id)
    }
    // 退出登录操作
    const loginoutAction = async () => {
      await useTokenStore().removeToken()
      userInfo.value = {} as IUserInfo
      // 退出登录后，清空菜单
      useMenuStore().menuList = []
      // 跳转到登录页
      router.push({ name: 'Login', replace: true })
    }
    // 手机号 + 验证码 登陆操作
    const loginByPhoneAction = async (account: IAccountByPhone) => {
      const res = await loginByPhone(account)
      await useTokenStore().setToken(res.token)
      // 登录成功后，获取用户信息
      const userInfoRes = await getUserInfoById(res.id)
      userInfo.value = userInfoRes
      // 登录成功后，获取菜单
      await useMenuStore().getMenuList(userInfoRes.role.id)
    }
    return {
      userInfo,
      loginAction,
      loginoutAction,
      loginByPhoneAction,
    }
  },
  {
    persist: {
      key: USERINFO_KEY,
    },
  },
)
