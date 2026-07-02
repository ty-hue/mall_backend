import type { IContentConfig } from '@/types/content-item'
import type { IProduct } from '@/types/product'

export const contentConfig: IContentConfig<IProduct> = {
  title: '商品列表',
  addBtnText: '新建商品',
  apiUrl: 'product',
  permissionPrefix: 'product',
  permissionPageName: 'info',
  columns: [
    { prop: 'id', label: '序号', width: 60, align: 'center' },
    { prop: 'name', label: '商品名称', width: 180, align: 'center' },
    { prop: 'price', label: '价格', width: 100, align: 'center' },
    { prop: 'stock', label: '库存', width: 80, align: 'center' },
    {
      prop: 'status',
      label: '状态',
      width: 80,
      align: 'center',
      type: 'tag',
      tagMap: { 0: { type: 'danger', label: '下架' }, 1: { type: 'success', label: '上架' } },
    },
    { prop: 'createAt', label: '创建时间', align: 'center', type: 'date' },
    { prop: 'updateAt', label: '更新时间', align: 'center', type: 'date' },
    { label: '操作', align: 'center', type: 'handler' },
  ],
  deleteConfirmText: '确认删除该商品吗？',
}
