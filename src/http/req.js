/***
 *  封装axios拦截器
 *
 *
 *
 */
import axios from 'axios'
axios.interceptors.request.use((cfg) => {
  // 公共部分url
  // cfg.baseURL = 'https://reactapi.iynn.cn'
  if (localStorage.getItem('jwt')) {
    // 此处token添加的key名称 由服务端决定  根据接口文档参数说明进行设置即可
    cfg.headers.Authorization = localStorage.getItem('jwt')
  }
  return cfg
})

axios.interceptors.response.use((res) => {
  const { errNo } = res.data
  // 判断数据中存在jwt(token) expire(过期时间)  acl(菜单列表)
  if (errNo === 0 && res.data.context.jwt && res.data.context.expire) {
    localStorage.setItem('jwt', res.data.context.jwt)
    localStorage.setItem('expire', res.data.context.expire)
  }
  if (errNo === 0 && res.data.context.acl) {
    localStorage.setItem('acl', JSON.stringify(res.data.context.acl))
  }
  return res
})

export default axios
