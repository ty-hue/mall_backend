import type { IFormItem } from '@/types'
import type { ICategory } from '@/types/category'

export const searchConfig: IFormItem<ICategory>[] = [
  {
    label: '分类名称',
    prop: 'name',
    type: 'input',
    placeholder: '请输入分类名称',
    initialValue: '',
    span: 8,
    labelWidth: '150px',
  },
]
