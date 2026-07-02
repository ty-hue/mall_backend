import type { IModalConfig } from '@/types/modal-item'
import type { ICategory } from '@/types/category'

export const modalConfig: IModalConfig<ICategory> = {
  entityName: '分类',
  apiUrl: 'category',
  fields: [
    { prop: 'name', label: '分类名称', type: 'input', placeholder: '请输入分类名称' },
    {
      prop: 'parentId',
      label: '父级分类',
      type: 'select',
      placeholder: '请选择父级分类（可选）',
      listKey: 'categoryList',
      optionLabel: 'name',
      optionValue: 'id',
    },
  ],
}
