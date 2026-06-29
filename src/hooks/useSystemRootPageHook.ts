import { getPageList } from '@/service/apis/main'
import { ref } from 'vue'

export const useSystemRootPageHook = () => {
  /** 泛型组件无法用 InstanceType，手动声明暴露接口 */
  interface SearchExposed {
    formData: Record<string, unknown>
  }
  interface ContentExposed {
    pagination: { currentPage: number; pageSize: number }
    loadData: (isInit?: boolean, isSearch?: boolean) => void
  }

  const searchRef = ref<SearchExposed | null>(null)
  const contentRef = ref<ContentExposed | null>(null)

  const loadPageData = async <T>(
    url: string,
    preCallback?: () => void,
    nextCallback?: (res: { list: T[]; total: number }) => void,
    isInit?: boolean,
    isAll?: boolean,
  ) => {
    preCallback?.()
    const res = await getPageList<T>(url, {
      ...(isAll ? {} : contentRef.value?.pagination),
      condition: isInit ? {} : (searchRef.value?.formData as Partial<T>),
    })
    nextCallback?.(res)
  }

  const search = () => contentRef.value?.loadData(false, true)
  return {
    search,
    loadPageData,
    searchRef,
    contentRef,
  }
}
