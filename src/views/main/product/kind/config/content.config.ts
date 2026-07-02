import type { IContentConfig } from '@/types/content-item'
import type { ICategory } from '@/types/category'

export const contentConfig: IContentConfig<ICategory> = {
  title: '商品分类列表',
  addBtnText: '新建分类',
  apiUrl: 'category',
  permissionPrefix: 'product',
  permissionPageName: 'kind',
  columns: [
    { prop: 'id', label: '序号', width: 80, align: 'center' },
    { prop: 'name', label: '分类名称', width: 200, align: 'center' },
    { prop: 'createAt', label: '创建时间', align: 'center', type: 'date' },
    { prop: 'updateAt', label: '更新时间', align: 'center', type: 'date' },
    { label: '操作', align: 'center', type: 'handler' },
  ],
  deleteConfirmText: '确认删除该分类吗？',
}
