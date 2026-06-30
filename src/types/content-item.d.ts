/** 表格列配置 */
export interface IContentColumn<T> {
  /** 列属性名 */
  prop?: keyof T
  /** 列标题 */
  label: string
  /** 列宽度 */
  width?: string | number
  /** 对齐方式 */
  align?: 'left' | 'center' | 'right'
  /** 列类型：default=纯文本, tag=标签, date=日期格式化, slot=自定义插槽, handler=操作列 */
  type?: 'default' | 'tag' | 'date' | 'custom' | 'handler'
  /** type=tag 时的映射配置 */
  tagMap?: Record<number, { type: 'success' | 'danger' | 'warning' | 'info'; label: string }>
  /** 自定义插槽名（type=slot 时使用） */
  slotName?: string
}

/** 表格内容配置 */
export interface IContentConfig<T> {
  /** 页面标题 */
  title: string
  /** 新建按钮文字 */
  addBtnText: string
  /** API 路径，如 'user' | 'department' */
  apiUrl: string
  /** 表格列配置 */
  columns: IContentColumn<T>[]
  /** 删除确认文字模板，{title} 会被title替换 */
  deleteConfirmText?: string
  // 树形数据表格渲染配置
  childrenTree?: {
    rowKey: string
    treeProps: {
      children: string
    }
  }
}
