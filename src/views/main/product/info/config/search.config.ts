import type { IFormItem } from '@/types'
import type { IProduct } from '@/types/product'

export const searchConfig: IFormItem<IProduct>[] = [
  {
    label: '商品名称',
    prop: 'name',
    type: 'input',
    placeholder: '请输入商品名称',
    initialValue: '',
    span: 8,
    labelWidth: '150px',
  },
  {
    label: '状态',
    prop: 'status',
    type: 'select',
    placeholder: '请选择状态',
    initialValue: '',
    options: [
      { label: '上架', value: 1 },
      { label: '下架', value: 0 },
    ],
    span: 8,
    labelWidth: '150px',
  },
]
