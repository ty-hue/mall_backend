import { resSuccess, deepClone, writeJsonFile } from './common'
import department from './json/department.json'
import path from 'path'
const deptJsonPath = path.join(__dirname, './json/department.json')

export default [
  // 分页查询部门列表接口
  {
    method: 'post',
    url: '/api/department/list',
    response: ({ body }) => {
      const { currentPage, pageSize, condition = {} } = body // 兜底空对象，防止 condition 为 undefined
      let departmentList = deepClone(department)
      if (!currentPage || !pageSize)
        return resSuccess({
          list: departmentList,
          total: departmentList.length,
        })
      // 如果有查询条件，就根据查询条件过滤部门（查询的结果要满足所有查询条件）
      if (Object.keys(condition).length) {
        departmentList = departmentList.filter((item) =>
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
        list: departmentList.slice(start, end),
        total: departmentList.length,
      })
    },
  },
  // 新建部门接口
  {
    method: 'put',
    url: '/api/department',
    response: ({ body }) => {
      const dept = deepClone(body)
      dept.id = department.length + 1
      dept.createAt = new Date().toISOString()
      dept.updateAt = new Date().toISOString()
      dept.parentId = dept.parentId ?? null
      department.unshift(dept)
      writeJsonFile(deptJsonPath, department)
      return resSuccess(null)
    },
  },
  // 更新部门接口
  {
    method: 'patch',
    url: '/api/department/:id',
    response: (req) => {
      const id = Number(req.url.split('/').pop())
      const dept = department.find((item) => item.id === id)
      if (!dept) {
        return resSuccess({ code: 404, msg: '部门不存在' })
      }
      Object.assign(dept, req.body)
      dept.updateAt = new Date().toISOString()
      writeJsonFile(deptJsonPath, department)
      return resSuccess(null)
    },
  },
  // 删除部门接口
  {
    method: 'delete',
    url: '/api/department/:id',
    response: (req) => {
      const id = Number(req.url.split('/').pop())
      const idx = department.findIndex((item) => item.id === id)
      if (idx === -1) {
        return resSuccess({ code: 404, msg: '部门不存在' })
      }
      department.splice(idx, 1)
      writeJsonFile(deptJsonPath, department)
      return resSuccess(null)
    },
  },
]
