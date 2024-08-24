import { IStatusMessage } from '../types/authTypes'
import _apiClient from '../api/api-client'
import { isAxiosError } from 'axios'

type ApiReturnFunction = IStatusMessage

const apiRequest = async (
  method: 'get' | 'post' | 'patch' | 'put',
  url: string,
  formData?: FormData,
): Promise<ApiReturnFunction> => {
  try {
    const response = await _apiClient[method]<IStatusMessage>(url, formData)
    return response.data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return {
        success: false,
        message: error.response.data.message,
      }
    }
    return {
      success: false,
      message: 'An error occurred, Please try again.',
    }
  }
}

export const LoginService = (
  formdata: FormData,
): Promise<ApiReturnFunction> => {
  return apiRequest('post', '/auth/login', formdata)
}

export const RegisterService = (
  formdata: FormData,
): Promise<ApiReturnFunction> => {
  return apiRequest('post', '/auth/register', formdata)
}

export const RefreshAccessToken = async (): Promise<ApiReturnFunction> => {
  return apiRequest('post', '/auth/token/refresh')
}

export const verifyEmailService = (
  token: string | null,
): Promise<ApiReturnFunction> => {
  return apiRequest('patch', `/auth/email-status?token=${token}`)
}

export const ForgotPasswordService = (
  formdata: FormData,
): Promise<ApiReturnFunction> => {
  return apiRequest('post', '/auth/forgot-password', formdata)
}

export const ResetPasswordService = (
  formdata: FormData,
): Promise<ApiReturnFunction> => {
  return apiRequest('patch', '/auth/reset-password', formdata)
}
