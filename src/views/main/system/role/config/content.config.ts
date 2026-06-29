import type { IContentConfig } from '@/types/content-item'
import type { IRole } from '@/types/role'

export const contentConfig: IContentConfig<IRole> = {
  title: '角色列表',
  addBtnText: '新建角色',
  apiUrl: 'role',
  columns: [
    { prop: 'id', label: '序号', width: 55, align: 'center' },
    { prop: 'name', label: '角色名称', width: 180, align: 'center' },
    { prop: 'intro', label: '权限介绍', width: 180, align: 'center' },
    { prop: 'create_time', label: '创建时间', align: 'center', type: 'date' },
    { prop: 'update_time', label: '更新时间', align: 'center', type: 'date' },
    { label: '操作', align: 'center', type: 'handler' },
  ],
  deleteConfirmText: '确认删除该角色吗？',
}
