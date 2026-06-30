import { resSuccess, deepClone, writeJsonFile } from './common'
import role from './json/role.json'
import users from './json/users.json'
import path from 'path'
const roleJsonPath = path.join(__dirname, './json/role.json')
const usersJsonPath = path.join(__dirname, './json/users.json')

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
            // 搜索值为空、null、undefined、空字符串、空数组，跳过当前字段校验
            if ([null, undefined, ''].includes(searchVal)) return true
            if (Array.isArray(searchVal) && searchVal.length === 0) return true
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
  // 新建角色接口
  {
    method: 'put',
    url: '/api/role',
    response: ({ body }) => {
      const newRole = deepClone(body)
      newRole.id = role.length > 0 ? Math.max(...role.map((r) => r.id)) + 1 : 1
      newRole.createAt = new Date().toISOString()
      newRole.updateAt = new Date().toISOString()
      newRole.permissions = newRole.permissions ?? []
      role.unshift(newRole)
      writeJsonFile(roleJsonPath, role)
      return resSuccess(null)
    },
  },
  // 更新角色接口
  {
    method: 'patch',
    url: '/api/role/:id',
    response: (req) => {
      const id = Number(req.url.split('/').pop())
      const roleItem = role.find((item) => item.id === id)
      if (!roleItem) {
        return resSuccess({ code: 404, msg: '角色不存在' })
      }
      // 超级管理员角色不允许修改
      if (id === 1) {
        return resSuccess({ code: 403, msg: '不能修改"超级管理员"角色' })
      }
      Object.assign(roleItem, req.body)
      roleItem.updateAt = new Date().toISOString()
      writeJsonFile(roleJsonPath, role)
      return resSuccess(null)
    },
  },
  // 删除角色接口
  {
    method: 'delete',
    url: '/api/role/:id',
    response: (req) => {
      const id = Number(req.url.split('/').pop())
      const idx = role.findIndex((item) => item.id === id)
      if (idx === -1) {
        return resSuccess({ code: 404, msg: '角色不存在' })
      }
      // 超级管理员和普通用户角色不允许删除
      if (id === 1) {
        return resSuccess({ code: 403, msg: '不能删除"超级管理员"角色' })
      }
      if (id === 3) {
        return resSuccess({ code: 403, msg: '不能删除"普通用户"角色' })
      }
      // 找到"普通用户"角色，用于替换被删除角色的用户
      const defaultRole = role.find((r) => r.id === 3)
      if (!defaultRole) {
        return resSuccess({ code: 500, msg: '默认角色"普通用户"不存在' })
      }
      // 把所有引用了待删除角色的用户的 role 改成"普通用户"
      users.forEach((user) => {
        if (user.role && user.role.id === id) {
          user.role = { ...defaultRole }
        }
      })
      writeJsonFile(usersJsonPath, users)
      role.splice(idx, 1)
      writeJsonFile(roleJsonPath, role)
      return resSuccess(null)
    },
  },
]
