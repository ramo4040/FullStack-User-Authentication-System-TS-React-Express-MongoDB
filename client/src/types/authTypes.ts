import React from 'react'

export interface AuthContextType {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  LogOut: () => Promise<void>
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
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
