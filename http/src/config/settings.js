// 基础配置项

export const _httpOptions = {
  baseURL: '', // api的base_url
  retry: 2,
  retryDelay: 1000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json;charset=UTF-8"
  },
  timeout: 5000, // request timeout
  method: 'post' // 默认请求方法
}

// http类型
export const _httpType = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'delete'
}

// 后台状态码
export const _httpCode = {
  ok: 200,
  err: 300,
  noAuth: 401
}