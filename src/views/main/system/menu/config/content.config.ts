import type { IContentConfig } from '@/types/content-item'
import type { MenuItem } from '@/types/login'

export const contentConfig: IContentConfig<MenuItem> = {
  title: '菜单列表',
  addBtnText: '新建菜单',
  apiUrl: 'menu',
  columns: [
    { prop: 'name', label: '菜单名称', width: 180, align: 'center' },
    { prop: 'parentId', label: '父菜单ID', align: 'center' },
    { prop: 'url', label: '菜单路径', width: 240, align: 'center' },
    { prop: 'icon', label: '菜单图标', align: 'center' },
    { prop: 'permission', label: '权限', align: 'center' },
    { label: '操作', align: 'center', type: 'handler' },
  ],
  deleteConfirmText: '确认删除该菜单吗？',
  childrenTree: {
    rowKey: 'id',
    treeProps: {
      children: 'children',
    },
  },
}
