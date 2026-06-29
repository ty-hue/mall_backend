import type { IFormItem } from '@/types'

/** 部门搜索表单参数类型 */
interface DepartmentSearchParams {
  [key: string]: unknown
  name: string
  leader: string
}

export const searchConfig: IFormItem<DepartmentSearchParams>[] = [
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
