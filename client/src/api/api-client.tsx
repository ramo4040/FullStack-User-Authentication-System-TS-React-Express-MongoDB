import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { RefreshAccessToken } from '../services/authService'

const BASE_URL = 'http://localhost:3000/api/v1'

const _apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

// Flag to prevent multiple token refresh requests
let isRefreshing = false

// Response interceptor for API calls
_apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest: AxiosRequestConfig = error.config

    if (error.response && error.response.status === 403) {
      if (!isRefreshing) {
        isRefreshing = true
        try {
          // Refresh the access token
          const accessToken = await RefreshAccessToken()

          if (accessToken.status === 401) {
            return Promise.reject(error)
          }

          // Retry the original request
          return _apiClient(originalRequest)
        } catch (refreshError) {
          return Promise.reject(refreshError)
        }
      }
    }
    // Return a Promise rejection if the status code is not 403
    return Promise.reject(error)
  },
)

export default _apiClient
