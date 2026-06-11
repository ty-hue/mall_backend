import type { IAccount, ILoginResponse, IUserInfo } from '@/types'
import request from '@/service'
// 登陆接口
export async function login(account: IAccount) {
  return request.post<ILoginResponse>('/api/login', account)
}

export async function getUserInfoById(id: number) {
  return request.get<IUserInfo>(`/api/getUserInfo/${id}`)
}
