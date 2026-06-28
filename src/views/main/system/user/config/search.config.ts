import type { IFormItem } from '@/types'

export const searchConfig: IFormItem[] = [
  {
    label: '用户名',
    prop: 'name',
    type: 'input',
    placeholder: '请输入用户名',
    initialValue: '',
    span: 8,
    labelWidth: '150px',
  },
  {
    label: '真实姓名',
    prop: 'realname',
    type: 'input',
    placeholder: '请输入真实姓名',
    initialValue: '',
    span: 8,
    labelWidth: '150px',
  },
  {
    label: '手机号',
    prop: 'phone',
    type: 'input',
    placeholder: '请输入手机号',
    initialValue: '',
    span: 8,
    labelWidth: '150px',
  },
  {
    label: '状态',
    prop: 'enabled',
    type: 'select',
    placeholder: '请选择状态',
    initialValue: 1,
    options: [
      { label: '启用', value: 1 },
      { label: '禁用', value: 0 },
    ],
    span: 8,
    labelWidth: '150px',
  },
  {
    label: '创建时间',
    prop: 'createAt',
    type: 'date-picker',
    placeholder: '请选择创建时间',
    initialValue: [],
    span: 8,
    labelWidth: '150px',
  },
]
