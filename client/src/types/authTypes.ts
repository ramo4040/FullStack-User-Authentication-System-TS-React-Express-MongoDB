import React from 'react'

export interface AuthContextType {
  logOut: () => Promise<void>
  isloading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  isAuthenticated: boolean
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  isEmailVerified: boolean
  setIsEmailVerified: React.Dispatch<React.SetStateAction<boolean>>
  showNotification: (props: INotificationProps) => void
}

export interface INotificationProps {
  message: string
  type: 'success' | 'error' | 'warning' | 'info' // Adjust types as needed
  timeout?: number
}

export interface User {
  id: number
  username: string
  isEmailVerified: boolean
  // add other user properties as needed
}

export interface LoginData {
  username: string
  password: string
}

export interface IStatusMessage {
  success: boolean
  status?: number
  message?: string
  user?: User | null
  isEmailVerified?: boolean
  accessToken?: string
  refreshToken?: string
}
