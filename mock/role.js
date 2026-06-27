import { resSuccess, deepClone } from './common'
import role from './json/role.json'

export default [
  // 分页查询角色列表接口
  {
    method: 'post',
    url: '/api/role/list',
    response: ({ body }) => {
      const { currentPage, pageSize, condition = {} } = body // 兜底空对象，防止 condition 为 undefined
      let roleList = deepClone(role)
      // 如果没有分页参数，就返回所有角色
      if (!currentPage || !pageSize)
        return resSuccess({
          list: roleList,
          total: roleList.length,
        })

      // 如果有查询条件，就根据查询条件过滤角色（查询的结果要满足所有查询条件）
      if (Object.keys(condition).length) {
        roleList = roleList.filter((item) =>
          Object.keys(condition).every((key) => {
            const searchVal = condition[key]
            // 搜索值为空、null、undefined、空字符串，跳过当前字段校验
            if ([null, undefined, ''].includes(searchVal)) return true
            // 匹配当前字段
            return item[key] == searchVal
          }),
        )
      }

      const start = (currentPage - 1) * pageSize
      const end = start + pageSize
      return resSuccess({
        list: roleList.slice(start, end),
        total: roleList.length,
      })
    },
  },
]
