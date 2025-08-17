import axios from 'axios'

// 创建 axios 实例
const api = axios.create({
  // 基础 URL，根据环境变量设置
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000',
  
  // 请求超时时间
  timeout: 30000,
  
  // 请求头
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  
  // 是否携带凭证（cookies等）
  withCredentials: false,
})

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    
    // 添加认证 token（如果存在）
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    // 添加语言设置
    const language = localStorage.getItem('language') || 'zh-CN'
    config.headers['Accept-Language'] = language
    
    // 添加请求时间戳（用于缓存控制）
    config.headers['X-Request-Time'] = Date.now()
    
    // 打印请求信息（开发环境）
    if (process.env.NODE_ENV === 'development') {
      console.log('🚀 API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        data: config.data,
        headers: config.headers,
      })
    }
    
    return config
  },
  (error) => {
    // 对请求错误做些什么
    console.error('❌ Request Error:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    
    // 打印响应信息（开发环境）
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ API Response:', {
        status: response.status,
        url: response.config.url,
        data: response.data,
      })
    }
    
    // 如果响应包含新的 token，更新存储
    const newToken = response.headers['x-new-token'] || response.data?.newToken
    if (newToken) {
      localStorage.setItem('authToken', newToken)
    }
    
    return response
  },
  (error) => {
    // 对响应错误做点什么
    
    // 打印错误信息
    console.error('❌ Response Error:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url,
      message: error.message,
      data: error.response?.data,
    })
    
    // 处理不同的错误状态码
    if (error.response) {
      const { status, data } = error.response
      
      switch (status) {
        case 401:
          // 未授权，清除 token 并跳转到登录页
          localStorage.removeItem('authToken')
          sessionStorage.removeItem('authToken')
          // 可以在这里添加重定向逻辑
          console.warn('⚠️ 用户未授权，请重新登录')
          break
          
        case 403:
          // 禁止访问
          console.warn('⚠️ 没有权限访问此资源')
          break
          
        case 404:
          // 资源不存在
          console.warn('⚠️ 请求的资源不存在')
          break
          
        case 429:
          // 请求过于频繁
          console.warn('⚠️ 请求过于频繁，请稍后再试')
          break
          
        case 500:
          // 服务器内部错误
          console.error('💥 服务器内部错误')
          break
          
        default:
          console.error(`💥 HTTP ${status} 错误`)
      }
      
      // 返回自定义错误信息
      return Promise.reject({
        status,
        message: data?.message || error.message,
        data: data,
        originalError: error,
      })
    } else if (error.request) {
      // 请求已发出但没有收到响应
      console.error('💥 网络错误：没有收到响应')
      return Promise.reject({
        status: 0,
        message: '网络错误，请检查网络连接',
        originalError: error,
      })
    } else {
      // 请求配置出错
      console.error('💥 请求配置错误:', error.message)
      return Promise.reject({
        status: 0,
        message: '请求配置错误',
        originalError: error,
      })
    }
  }
)

// 添加请求重试功能
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error
    
    // 如果是网络错误且配置允许重试
    if (!response && config && config.retry !== false) {
      config.retryCount = config.retryCount || 0
      const maxRetries = config.maxRetries || 3
      
      if (config.retryCount < maxRetries) {
        config.retryCount++
        
        // 延迟重试（指数退避）
        const delay = Math.pow(2, config.retryCount) * 1000
        console.log(`🔄 重试请求 (${config.retryCount}/${maxRetries})，延迟 ${delay}ms`)
        
        await new Promise(resolve => setTimeout(resolve, delay))
        return api(config)
      }
    }
    
    return Promise.reject(error)
  }
)

// 导出配置好的 axios 实例
export default api

// 导出常用的 HTTP 方法
export const get = (url, config = {}) => api.get(url, config)
export const post = (url, data = {}, config = {}) => api.post(url, data, config)
export const put = (url, data = {}, config = {}) => api.put(url, data, config)
export const patch = (url, data = {}, config = {}) => api.patch(url, data, config)
export const del = (url, config = {}) => api.delete(url, config)

// 导出请求配置类型
export const createRequestConfig = (config = {}) => ({
  timeout: 30000,
  retry: true,
  maxRetries: 3,
  ...config,
})

// 导出错误处理工具
export const handleApiError = (error) => {
  if (error.status === 401) {
    // 处理认证错误
    return '请先登录'
  } else if (error.status === 403) {
    // 处理权限错误
    return '没有权限执行此操作'
  } else if (error.status === 404) {
    // 处理资源不存在错误
    return '请求的资源不存在'
  } else if (error.status === 429) {
    // 处理频率限制错误
    return '请求过于频繁，请稍后再试'
  } else if (error.status >= 500) {
    // 处理服务器错误
    return '服务器错误，请稍后再试'
  } else {
    // 处理其他错误
    return error.message || '未知错误'
  }
}

// 导出请求状态管理
export const createRequestState = () => {
  let abortController = null
  
  return {
    // 开始请求
    start: () => {
      if (abortController) {
        abortController.abort()
      }
      abortController = new AbortController()
      return abortController.signal
    },
    
    // 取消请求
    cancel: () => {
      if (abortController) {
        abortController.abort()
        abortController = null
      }
    },
    
    // 检查是否已取消
    isCancelled: () => {
      return abortController?.signal.aborted || false
    }
  }
}
