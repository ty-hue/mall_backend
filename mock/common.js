import fs from 'fs'

// 模拟分页工具
export function createPageList(list, page = 1, pageSize = 10) {
  const start = (page - 1) * pageSize
  return {
    code: 200,
    data: list.slice(start, start + pageSize),
    total: list.length,
    page,
    pageSize,
  }
}

// 通用返回结构模板
export function resSuccess(data, code = 1, message = '请求成功') {
  return { code, data, message }
}

export function resFail(message = '请求失败', code = 0) {
  return { code, data: null, message }
}

// 验证token
export function verifyToken(req) {
  const token = req.headers.authorization
  if (!token) {
    return false
  }
  return true
}

// 整理用户列表
export function formatUserList(list) {
  return list.map((item) => {
    item.departmentId = item.department.id
    item.roleId = item.role.id
    delete item.department
    delete item.role
    return item
  })
}

// 深拷贝
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

export async function writeJsonFile(filePath, data) {
  try {
    // 格式化json，带缩进方便阅读
    const jsonStr = JSON.stringify(data, null, 2)
    // 同步/异步二选一，推荐异步不阻塞事件循环
    await fs.promises.writeFile(filePath, jsonStr, 'utf8')
    return true
  } catch (err) {
    console.error('写入JSON文件失败：', err)
    return false
  }
}

export { Mock } from 'mockjs'
