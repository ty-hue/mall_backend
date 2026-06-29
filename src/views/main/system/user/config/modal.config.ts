import type { IModalConfig } from '@/types/modal-item'
import type { IUser } from '@/types/users'

type UserFormData = IUser & { password?: string }

export const modalConfig: IModalConfig<UserFormData> = {
  entityName: '用户',
  apiUrl: 'user',
  fields: [
    { prop: 'name', label: '用户名', type: 'input', placeholder: '请输入用户名' },
    { prop: 'realname', label: '真实姓名', type: 'input', placeholder: '请输入真实姓名' },
    {
      prop: 'password',
      label: '密码',
      type: 'password',
      placeholder: '请输入密码',
      onlyOnAdd: true,
    },
    { prop: 'phone', label: '电话号码', type: 'input', placeholder: '请输入电话号码' },
    { prop: 'enabled', label: '状态', type: 'switch', activeValue: 1, inactiveValue: 0 },
    {
      prop: 'roleId',
      label: '角色',
      type: 'select',
      placeholder: '请选择角色',
      listKey: 'roleList',
      optionLabel: 'name',
      optionValue: 'id',
    },
    {
      prop: 'departmentId',
      label: '部门',
      type: 'select',
      placeholder: '请选择部门',
      listKey: 'departmentList',
      optionLabel: 'name',
      optionValue: 'id',
    },
  ],
}
