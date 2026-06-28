export interface IFormItem<T extends Record<string, unknown> = Record<string, unknown>> {
  label: string
  prop: keyof T
  type: string
  placeholder: string
  initialValue: T[keyof T]
  span?: number
  labelWidth?: string
  options?: {
    label: string
    value: number
  }[]
}
