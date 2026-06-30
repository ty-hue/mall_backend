import menu from './json/menu.json'
import role from './json/role.json'
import { resSuccess, resFail, deepClone, writeJsonFile } from './common'
import path from 'path'
const menuJsonPath = path.join(__dirname, './json/menu.json')
const roleJsonPath = path.join(__dirname, './json/role.json')
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
  // 获取全部菜单（树形结构，用于角色权限选择等）
  {
    method: 'get',
    url: '/api/menu',
    response: () => {
      const menuTree = buildMenuTree(menu)
      return resSuccess(menuTree)
    },
  },
  // 新建菜单接口
  {
    method: 'put',
    url: '/api/menu',
    response: ({ body }) => {
      const newMenu = deepClone(body)
      newMenu.id = menu.length > 0 ? Math.max(...menu.map((m) => m.id)) + 1 : 1
      newMenu.parentId = newMenu.parentId ?? null
      newMenu.permissionId = newMenu.permissionId ?? null
      newMenu.permission = newMenu.permission ?? null
      newMenu.icon = newMenu.icon ?? null
      newMenu.url = newMenu.url ?? null
      menu.unshift(newMenu)
      writeJsonFile(menuJsonPath, menu)
      return resSuccess(null)
    },
  },
  // 更新菜单接口
  {
    method: 'patch',
    url: '/api/menu/:id',
    response: (req) => {
      const id = Number(req.url.split('/').pop())
      const menuItem = menu.find((item) => item.id === id)
      if (!menuItem) {
        return resSuccess({ code: 404, msg: '菜单不存在' })
      }
      Object.assign(menuItem, req.body)
      writeJsonFile(menuJsonPath, menu)
      return resSuccess(null)
    },
  },
  // 删除菜单接口（级联删除子菜单 + 清理角色权限）
  {
    method: 'delete',
    url: '/api/menu/:id',
    response: (req) => {
      const id = Number(req.url.split('/').pop())
      const idx = menu.findIndex((item) => item.id === id)
      if (idx === -1) {
        return resSuccess({ code: 404, msg: '菜单不存在' })
      }
      // 收集所有需要删除的菜单id（当前节点 + 所有子孙节点）
      const menuIdsToDelete = new Set([id])
      let changed = true
      while (changed) {
        changed = false
        menu.forEach((item) => {
          if (
            item.parentId !== null &&
            menuIdsToDelete.has(item.parentId) &&
            !menuIdsToDelete.has(item.id)
          ) {
            menuIdsToDelete.add(item.id)
            changed = true
          }
        })
      }
      // 收集所有需要删除的 permissionId
      const permissionIdsToDelete = new Set()
      menu.forEach((item) => {
        if (menuIdsToDelete.has(item.id) && item.permissionId !== null) {
          permissionIdsToDelete.add(item.permissionId)
        }
      })
      // 从所有角色的 permissions 中移除被删除菜单的 permissionId
      role.forEach((roleItem) => {
        roleItem.permissions = roleItem.permissions.filter((p) => !permissionIdsToDelete.has(p))
      })
      writeJsonFile(roleJsonPath, role)
      // 删除所有匹配的菜单项
      for (let i = menu.length - 1; i >= 0; i--) {
        if (menuIdsToDelete.has(menu[i].id)) {
          menu.splice(i, 1)
        }
      }
      writeJsonFile(menuJsonPath, menu)
      return resSuccess(null)
    },
  },
]
