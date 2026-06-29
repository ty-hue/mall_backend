export interface IRole {
  [key: string]: unknown
  id: number
  name: string
  intro: string
  create_time: string
  update_time: string
  permissions: number[]
}
