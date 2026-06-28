import { resSuccess, formatUserList, deepClone, writeJsonFile } from './common'
import users from './json/users.json'
import path from 'path'
import department from './json/department.json'
import role from './json/role.json'
const userJsonPath = path.join(__dirname, './json/users.json')

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
  // 更新用户接口
  {
    method: 'patch',
    url: '/api/user/:id',
    response: (req) => {
      // url中截取id
      const idStr = req.url.split('/').pop() // 取最后一段
      const id = Number(idStr)
      const user = users.find((item) => item.id == id)
      if (!user) {
        return resSuccess({
          code: 404,
          msg: '用户不存在',
        })
      }
      // 合并更新字段
      Object.assign(user, req.body)

      // 处理部门 和 角色
      user.department = department.find((item) => item.id == user.departmentId)
      user.role = role.find((item) => item.id == user.roleId)
      delete user.role.permissions
      delete user.departmentId
      delete user.roleId
      // 写入更新后的用户列表到文件
      writeJsonFile(userJsonPath, users)
      return resSuccess({
        code: 200,
        msg: '更新成功',
        data: null,
      })
    },
  },
  // 添加用户接口
  {
    method: 'put',
    url: '/api/user',
    response: ({ body }) => {
      const user = deepClone(body)
      // 处理部门 和 角色
      user.department = department.find((item) => item.id == user.departmentId)
      user.role = role.find((item) => item.id == user.roleId)
      delete user.role.permissions
      delete user.departmentId
      delete user.roleId
      user.id = users.length + 1
      // 合并更新字段 (加到最前面)
      users.unshift(user)
      // 写入更新后的用户列表到文件
      writeJsonFile(userJsonPath, users)
      return resSuccess({
        code: 200,
        msg: '添加成功',
        data: null,
      })
    },
  },
  // 删除用户接口
  {
    method: 'delete',
    url: '/api/user/:id',
    response: (req) => {
      // url中截取id
      const idStr = req.url.split('/').pop() // 取最后一段
      const id = Number(idStr)
      const user = users.find((item) => item.id == id)
      if (!user) {
        return resSuccess({
          code: 404,
          msg: '用户不存在',
        })
      }
      const newUsers = users.filter((item) => item.id != id)
      // 写入更新后的用户列表到文件
      writeJsonFile(userJsonPath, newUsers)
      return resSuccess({
        code: 200,
        msg: '删除成功',
        data: null,
      })
    },
  },
]
