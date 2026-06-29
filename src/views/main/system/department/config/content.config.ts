import type { IContentConfig } from '@/types/content-item'
import type { IDepartment } from '@/types/department'

export const contentConfig: IContentConfig<IDepartment> = {
  title: '部门列表',
  addBtnText: '新建部门',
  apiUrl: 'department',
  columns: [
    { prop: 'id', label: '序号', width: 55, align: 'center' },
    { prop: 'name', label: '部门名称', width: 180, align: 'center' },
    { prop: 'leader', label: '部门领导人', width: 180, align: 'center' },
    { prop: 'create_time', label: '创建时间', align: 'center', type: 'date' },
    { prop: 'update_time', label: '更新时间', align: 'center', type: 'date' },
    { label: '操作', align: 'center', type: 'handler' },
  ],
  deleteConfirmText: '确认删除该部门吗？',
}
