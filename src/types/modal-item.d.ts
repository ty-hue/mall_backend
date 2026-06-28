/** 弹窗表单字段配置 */
export interface IModalField {
  /** 字段标签 */
  label: string
  /** 字段属性名 */
  prop: string
  /** 表单控件类型 */
  type: 'input' | 'password' | 'switch' | 'select'
  /** 占位文本 */
  placeholder?: string
  /** 仅新建时显示 */
  onlyOnAdd?: boolean
  /** type=switch 时的 active 值 */
  activeValue?: number
  /** type=switch 时的 inactive 值 */
  inactiveValue?: number
  /** type=select 时，选项数据来源的 prop 名（如 'roleList'） */
  listKey?: string
  /** type=select 时，选项 label 对应的字段 */
  optionLabel?: string
  /** type=select 时，选项 value 对应的字段 */
  optionValue?: string
}

/** 弹窗表单配置 */
export interface IModalConfig {
  /** 实体名称，用于标题拼接（如"用户"→"新建用户"/"编辑用户"） */
  entityName: string
  /** API 路径 */
  apiUrl: string
  /** 表单字段配置 */
  fields: IModalField[]
}
