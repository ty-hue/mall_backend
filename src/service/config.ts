export const BASE_URL = import.meta.env.VITE_API_URL

export const TIME_OUT = 10 * 1000

// 接口成功状态码（根据你们后端改）
export const SUCCESS_CODE = 1

// 无需登录的白名单
export const WHITE_LIST = ['/api/login', '/api/register']
