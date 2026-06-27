import request from '@/service'

export async function getPageList<T>(
  url: string,
  params?: { currentPage?: number; pageSize?: number; condition?: Partial<T> },
) {
  return request.post<{ list: T[]; total: number }>(`/api/${url}/list`, params)
}
