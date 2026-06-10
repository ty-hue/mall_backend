// 统一管理存储 KEY（最重要！）
const STORAGE_KEY = {
  TOKEN: 'token',
  // 以后加其他key都在这里
}

class Storage {
  // 存
  set(key: string, value: unknown) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  // 取
  get<T = unknown>(key: string): T | null {
    const data = localStorage.getItem(key)
    if (!data) return null
    return JSON.parse(data)
  }

  // 删单个
  remove(key: string) {
    localStorage.removeItem(key)
  }

  // 清空所有
  clear() {
    localStorage.clear()
  }
}

// 导出实例
const storage = new Storage()

// 导出 KEY 常量
export { STORAGE_KEY }
export default storage
