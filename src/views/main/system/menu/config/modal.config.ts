import type { IModalConfig } from '@/types/modal-item'
import type { MenuItem } from '@/types/login'

export const modalConfig: IModalConfig<MenuItem> = {
  entityName: '菜单',
  apiUrl: 'menu',
  fields: [
    { prop: 'name', label: '菜单名称', type: 'input', placeholder: '请输入菜单名称' },
    { prop: 'url', label: '菜单路径', type: 'input', placeholder: '请输入菜单路径' },
    { prop: 'icon', label: '菜单图标', type: 'input', placeholder: '请输入菜单图标' },
    { prop: 'permissionId', label: '权限ID', type: 'input', placeholder: '请输入权限ID' },
    { prop: 'parentId', label: '父菜单ID', type: 'input', placeholder: '请输入父菜单ID' },
    { prop: 'permission', label: '权限', type: 'input', placeholder: '请输入权限' },
  ],
}
