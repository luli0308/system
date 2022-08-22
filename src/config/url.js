/***
 *  统一管理接口地址的配置
 */

const prefix = 'https://reactapi.iynn.cn'
const url = {
  // 登录接口
  Login: prefix + '/api/common/auth/login',
  // 登录用户身份信息
  AccountInfo: prefix + '/api/common/auth/adminInfo',
  // 校验jwt有效性
  CheckJWT: prefix + '/api/common/auth/jwtPreCheck',
  // 用户统计数据
  UserData: prefix + '/api/users/statistics/getData',
  // 用户列表数据
  UserList: prefix + '/api/users',
  // 删除用户 实际为禁用用户
  UserDel:prefix+'/api/users'
}

export default url
