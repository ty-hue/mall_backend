import type { IContentConfig } from '@/types/content-item'
import type { IUser } from '@/types/users'

export const contentConfig: IContentConfig<IUser> = {
  title: '用户列表',
  addBtnText: '新建用户',
  apiUrl: 'user',
  columns: [
    { prop: 'id', label: '序号', width: 55, align: 'center' },
    { prop: 'name', label: '用户名', width: 180, align: 'center' },
    { prop: 'realname', label: '真实姓名', width: 180, align: 'center' },
    { prop: 'phone', label: '电话号码', align: 'center' },
    {
      prop: 'enabled',
      label: '状态',
      align: 'center',
      type: 'tag',
      tagMap: { 0: { type: 'danger', label: '禁用' }, 1: { type: 'success', label: '启用' } },
    },
    { prop: 'createAt', label: '创建时间', align: 'center', type: 'date' },
    { prop: 'updateAt', label: '更新时间', align: 'center', type: 'date' },
  ],
  deleteConfirmText: '确认删除该用户吗？',
}
