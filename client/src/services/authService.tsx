import { IStatusMessage } from '../types/authTypes'
import _apiClient from '../api/api-client'
import axios, { AxiosResponse } from 'axios'

export const LoginService = async (
  formdata: FormData,
): Promise<IStatusMessage> => {
  try {
    const res = await _apiClient.post<IStatusMessage>('/login', formdata)
    return res.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) return error.response.data
    return {
      success: false,
      message: 'An error occurred during authentication, Please try again.',
    }
  }
}

export const RegisterService = async (
  formdata: FormData,
): Promise<IStatusMessage> => {
  try {
    const res = await _apiClient.post<IStatusMessage>('/register', formdata)
    return res.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) return error.response.data
    return {
      success: false,
      message: 'An error occurred during registration, Please try again.',
    }
  }
}

export const RefreshAccessToken = async (): Promise<
  AxiosResponse | undefined
> => {
  try {
    const res = await _apiClient.post('/token/refresh')
    return res
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) return error.response.data
  }
}

export const verifyEmailService = async (
  token: string,
): Promise<IStatusMessage> => {
  try {
    const res = await _apiClient.get(`/verify-email?token=${token}`)
    return res.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) return error.response.data
    return {
      success: false,
      message: 'error',
    }
  }
}
