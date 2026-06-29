import type { IFormItem } from '@/types'
import type { IDepartment } from '@/types/department'

export const searchConfig: IFormItem<IDepartment>[] = [
  {
    label: '部门名称',
    prop: 'name',
    type: 'input',
    placeholder: '请输入部门名称',
    initialValue: '',
    span: 8,
    labelWidth: '150px',
  },
  {
    label: '部门领导人',
    prop: 'leader',
    type: 'input',
    placeholder: '请输入部门领导人',
    initialValue: '',
    span: 8,
    labelWidth: '150px',
  },
]
