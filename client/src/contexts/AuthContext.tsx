import React, { createContext, useEffect, useState } from 'react'
import { AuthContextType } from '../types/authTypes'

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isloading, setIsLoading] = useState<boolean>(false)
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false)
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false)

  //check if user has a valid token
  useEffect(() => {}, [])

  const LogOut = async () => {
    setAuthenticated(false)
  }

  return (
    <>
      <AuthContext.Provider
        value={{
          LogOut,
          isloading,
          setIsLoading,
          isAuthenticated,
          setAuthenticated,
          isEmailVerified,
          setIsEmailVerified,
        }}
      >
        {!isloading && children}
      </AuthContext.Provider>
    </>
  )
}
