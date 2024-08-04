import React from 'react'

export interface AuthContextType {
  LogOut: () => Promise<void>
  isloading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  isAuthenticated: boolean
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}

export interface User {
  id: number
  username: string
  // add other user properties as needed
}

export interface LoginData {
  username: string
  password: string
}

export interface IStatusMessage {
  success: boolean
  status?: number
  message: string
  user?: User | null
  accessToken?: string
  refreshToken?: string
}
