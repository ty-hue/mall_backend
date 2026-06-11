export interface IAccount {
  username: string
  password: string
}

export interface ILoginResponse {
  id: number
  name: string
  token: string
}

export interface IUserInfo {
  id: number
  name: string
  realname: string
  enabled: number
  phone: string
  createAt: string
  updateAt: string
  role: Role
  department: Department
}

export interface Role {
  id: number
  name: string
  intro: string
  createAt: string
  updateAt: string
}

export interface Department {
  id: number
  name: string
  parentId: number | null
  leader: string
  createAt: string
  updateAt: string
}
