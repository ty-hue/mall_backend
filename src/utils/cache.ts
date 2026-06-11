// 缓存类型
export enum CacheType {
  LocalStorage,
  SessionStorage,
}
class LocalCache {
  private storage: Storage
  constructor(private cacheType: CacheType = CacheType.LocalStorage) {
    this.storage = this.cacheType === CacheType.LocalStorage ? localStorage : sessionStorage
  }
  // 设置缓存
  set(key: string, value: unknown) {
    // 转换为字符串
    const stringValue = JSON.stringify(value)
    this.storage.setItem(key, stringValue)
  }
  // 获取缓存
  get<T>(key: string): T | null {
    const stringValue = this.storage.getItem(key)
    if (stringValue) {
      return JSON.parse(stringValue) as T
    }
    return null
  }
  // 删除缓存
  remove(key: string) {
    this.storage.removeItem(key)
  }
}
const localCache = new LocalCache()
export default localCache
