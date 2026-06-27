import type { Cellphone } from '@element-plus/icons-vue'

export interface IUser {
  id: number
  name: string
  realname: string
  phone: string | null
  enabled: number
  departmentId: number
  createAt: string
  updateAt: string
  roleId: number
}
