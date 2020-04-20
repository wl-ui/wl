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
}

// http类型
export const _httpType = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'delete'
}