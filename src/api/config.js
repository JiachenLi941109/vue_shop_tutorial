import axios from 'axios'

// 创建一个axios实例
const service = axios.create({
  // 请求超时配置
  timeout: 3000
})
// 添加请求拦截器
service.interceptors.request.use(
  config => {
    return config
  },
  err => {
    console.log(err)
  }
)
// 添加响应拦截器
service.interceptors.response.use(
  response => {
    const res = {}
    res.status = response.status
    res.data = response.data
    return res
  },
  err => {
    console.log(err)
  }
)

axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('userToken')
    if (token) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.accessToken = token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
