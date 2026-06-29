import type { IModalConfig } from '@/types/modal-item'
import type { IDepartment } from '@/types/department'

export const modalConfig: IModalConfig<IDepartment> = {
  entityName: '部门',
  apiUrl: 'department',
  fields: [
    { prop: 'name', label: '部门名称', type: 'input', placeholder: '请输入部门名称' },
    { prop: 'leader', label: '部门领导人', type: 'input', placeholder: '请输入部门领导人' },
  ],
}
