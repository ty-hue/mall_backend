import request from '@/service'

export async function getPageList<T>(
  url: string,
  params?: { currentPage?: number; pageSize?: number; condition?: Partial<T> },
) {
  return request.post<{ list: T[]; total: number }>(`/api/${url}/list`, params)
}

export async function addApi<T>(url: string, data: T) {
  return request.put(`/api/${url}`, data)
}

export async function deleteApi(url: string, params: { id: number }) {
  return request.delete(`/api/${url}/${params.id}`)
}

export async function updateApi<T>(url: string, params: { id: number }, data: T) {
  return request.patch(`/api/${url}/${params.id}`, data)
}
