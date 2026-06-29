import type { IFormItem } from '@/types'
import type { IRole } from '@/types/role'

export const searchConfig: IFormItem<IRole>[] = [
  {
    label: '角色名称',
    prop: 'name',
    type: 'input',
    placeholder: '请输入角色名称',
    initialValue: '',
    span: 8,
    labelWidth: '150px',
  },
  {
    label: '权限介绍',
    prop: 'intro',
    type: 'input',
    placeholder: '请输入权限介绍',
    initialValue: '',
    span: 8,
    labelWidth: '150px',
  },
]
