import { IStatusMessage } from '../types/authTypes'

const API_URL = 'http://localhost:3000/api/v1/auth'

export const LoginService = async (
  formdata: FormData,
): Promise<IStatusMessage> => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      credentials: 'include',
      body: formdata,
    })
    const data = await response.json()
    return data
  } catch (error) {
    return {
      success: false,
      message: 'An error occurred during authentication, Please try again.',
    }
  }
}

export const ValidateUserService = async (): Promise<Partial<Response>> => {
  try {
    const response = await fetch(`${API_URL}/token/validate`, {
      method: 'post',
      credentials: 'include',
    })
    return response
  } catch (error) {
    return { ok: false }
  }
}

export const RefreshToken = async (): Promise<Partial<Response>> => {
  try {
    const response = await fetch(`${API_URL}/token/refresh`, {
      method: 'post',
      credentials: 'include',
    })
    return response
  } catch (error) {
    return { ok: false }
  }
}
