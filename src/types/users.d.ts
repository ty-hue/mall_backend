export interface IUser {
  [key: string]: unknown
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
