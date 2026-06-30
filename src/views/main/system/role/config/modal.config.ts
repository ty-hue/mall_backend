import type { IModalConfig } from '@/types/modal-item'
import type { IRole } from '@/types/role'

export const modalConfig: IModalConfig<IRole> = {
  entityName: '角色',
  apiUrl: 'role',
  fields: [
    { prop: 'name', label: '角色名称', type: 'input', placeholder: '请输入角色名称' },
    { prop: 'intro', label: '权限介绍', type: 'input', placeholder: '请输入权限介绍' },
    { prop: 'permissions', label: '权限ID列表', type: 'tree', placeholder: '请选择权限' },
  ],
}
