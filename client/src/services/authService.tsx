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

    return response.json()
  } catch (error) {
    return {
      success: false,
      message: 'An error occurred during authentication, Please try again.',
    }
  }
}
