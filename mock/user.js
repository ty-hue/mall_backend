import { resSuccess, formatUserList, deepClone } from './common'
import users from './json/users.json'

export default [
  // 分页查询用户列表接口
  {
    method: 'post',
    url: '/api/user/list',
    response: ({ body }) => {
      const { currentPage, pageSize, condition = {} } = body // 兜底空对象，防止 condition 为 undefined
      let userList = deepClone(users)

      // 如果有查询条件，就根据查询条件过滤用户（查询的结果要满足所有查询条件）
      if (Object.keys(condition).length) {
        userList = userList.filter((item) =>
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
        list: formatUserList(userList.slice(start, end)),
        total: userList.length,
      })
    },
  },
]
