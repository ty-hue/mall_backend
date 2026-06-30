import menu from './json/menu.json'
import role from './json/role.json'
import { resSuccess, resFail } from './common'
// 菜单转树形结构工具函数
function buildMenuTree(list) {
  const tree = []
  const map = {}
  // 先建立id映射
  list.forEach((item) => {
    map[item.id] = { ...item, children: [] }
  })
  // 遍历组装父子关系
  list.forEach((item) => {
    const node = map[item.id]
    if (item.parentId === null) {
      tree.push(node)
    } else {
      if (map[item.parentId]) {
        map[item.parentId].children.push(node)
      }
    }
  })
  return tree
}

export default [
  {
    method: 'get',
    url: '/api/menu/:roleId',
    response: (req) => {
      console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXX')

      const idStr = req.url.split('/').pop() // 取最后一段
      const roleId = Number(idStr)
      // 2. 根据角色ID查找角色
      const roleItem = role.find((item) => item.id === roleId)
      // 角色不存在返回空
      if (!roleItem) {
        return resFail('角色不存在')
      }
      // 当前角色拥有的权限ID集合
      const ownPermissionIds = new Set(roleItem.permissions)

      // 3. 过滤菜单：公共菜单(permissionId=null) + 有权限的菜单
      const filterMenu = menu.filter((item) => {
        // 无权限标识：公共菜单，直接展示
        if (item.permissionId === null) return true
        // 有权限标识：判断是否在角色权限内
        return ownPermissionIds.has(item.permissionId)
      })

      // 4. 转为树形菜单
      const menuTree = buildMenuTree(filterMenu)

      // 5. 返回规范接口格式
      return resSuccess(menuTree)
    },
  },
  // 分页获取菜单列表
  {
    method: 'post',
    url: '/api/menu/list',
    response: ({ body }) => {
      const { currentPage = 1, pageSize = 10 } = body
      const menuTree = buildMenuTree(menu)
      const start = (currentPage - 1) * pageSize
      const end = start + pageSize
      return resSuccess({
        total: menuTree.length,
        list: menuTree.slice(start, end),
      })
    },
  },
]
