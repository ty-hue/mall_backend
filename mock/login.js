import { resSuccess, resFail, verifyToken } from './common'
import users from './json/users.json'
export default [
  // 登陆接口
  {
    method: 'post',
    url: '/api/login',
    response: ({ body }) => {
      const { username, password } = body
      const user = users.find((item) => item.username === username && item.password === password)
      if (user) {
        return resSuccess({ id: user.id, name: user.name, token: user.token })
      }
      return resFail('用户名或密码错误')
    },
  },
  {
    method: 'get',
    url: '/api/getUserInfo/:id',
    response: (req) => {
      // 验证token
      if (!verifyToken(req)) {
        return resFail('身份验证失败')
      }
      // 验证通过之后，再获取用户信息
      const idStr = req.url.split('/').pop() // 取最后一段
      const id = Number(idStr)
      const user = users.find((item) => item.id === id)
      if (user) {
        // 要剔除username password token 字段
        // oxlint-disable-next-line no-unused-vars
        const { username, password, token, ...rest } = user
        return resSuccess(rest)
      }
      return resFail('用户不存在')
    },
  },
  //获取验证码 实际上什么都没有做，返回null，只是模拟一下有这个接口
  {
    method: 'get',
    url: '/api/getVerifyCode/:phone',
    response: () => {
      return resSuccess(null)
    },
  },
  // 手机号 + 验证码 登陆接口
  {
    method: 'post',
    url: '/api/loginByPhone',
    response: ({ body }) => {
      const { phone, code } = body
      const user = users.find((item) => item.phone === phone && item.code === code)
      if (user) {
        return resSuccess({ id: user.id, name: user.name, token: user.token })
      }
      return resFail('手机号或验证码错误')
    },
  },
]
