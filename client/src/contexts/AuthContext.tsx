import React, { createContext, useState } from 'react'
import { AuthContextType, User } from '../types/authTypes'

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false)

  const LogOut = async () => {
    setUser(null)
    setAuthenticated(false)
  }

  return (
    <>
      <AuthContext.Provider
        value={{
          user,
          setUser,
          LogOut,
          loading,
          setLoading,
          isAuthenticated,
          setAuthenticated,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  )
}
