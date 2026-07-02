import type { IModalConfig } from '@/types/modal-item'
import type { IProduct } from '@/types/product'

export const modalConfig: IModalConfig<IProduct> = {
  entityName: '商品',
  apiUrl: 'product',
  fields: [
    { prop: 'name', label: '商品名称', type: 'input', placeholder: '请输入商品名称' },
    {
      prop: 'categoryId',
      label: '商品分类',
      type: 'select',
      placeholder: '请选择商品分类',
      listKey: 'categoryList',
      optionLabel: 'name',
      optionValue: 'id',
    },
    { prop: 'price', label: '价格', type: 'input', placeholder: '请输入价格' },
    { prop: 'stock', label: '库存', type: 'input', placeholder: '请输入库存数量' },
    { prop: 'description', label: '商品描述', type: 'input', placeholder: '请输入商品描述' },
    { prop: 'imageUrl', label: '图片链接', type: 'input', placeholder: '请输入图片链接（可选）' },
    { prop: 'status', label: '上架状态', type: 'switch', activeValue: 1, inactiveValue: 0 },
  ],
}
