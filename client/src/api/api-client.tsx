import axios, { AxiosInstance } from 'axios'
import { RefreshAccessToken } from '../services/authService'

const BASE_URL = 'http://localhost:3000/api/v1/auth'

const _apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

// Response interceptor for API calls
_apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  async function (error) {
    const originalRequest = error.config
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true
      const access_token = await RefreshAccessToken()
      if (access_token?.status !== 200) {
        throw error
      }
      return _apiClient(originalRequest)
    }
    throw error
  },
)

export default _apiClient
