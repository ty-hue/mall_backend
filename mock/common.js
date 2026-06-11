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

export { Mock } from 'mockjs'
