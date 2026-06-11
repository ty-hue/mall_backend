import type { IAccount, IAccountByPhone, ILoginResponse, IUserInfo } from '@/types'
import request from '@/service'
// 登陆接口
export async function login(account: IAccount) {
  return request.post<ILoginResponse>('/api/login', account)
}
// 获取用户信息接口
export async function getUserInfoById(id: number) {
  return request.get<IUserInfo>(`/api/getUserInfo/${id}`)
}
// 获取验证码接口
export async function getVerifyCode(phone: string) {
  return request.get(`/api/getVerifyCode/${phone}`)
}
// 手机号 + 验证码 登陆接口
export async function loginByPhone(account: IAccountByPhone) {
  return request.post<ILoginResponse>('/api/loginByPhone', account)
}
