import React, { createContext, useEffect, useState } from 'react'
import { AuthContextType } from '../types/authTypes'
import { RefreshToken, ValidateUserService } from '../services/authService'

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isloading, setIsLoading] = useState<boolean>(true)
  const [emailVerification, setEmailVerification] = useState<boolean>(false)
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false)

  //check if user has a valid token
  useEffect(() => {
    const isValideToken = async () => {
      try {
        const isValid = await ValidateUserService()

        if (isValid.ok) {
          setAuthenticated(true)
          return
        }

        const refreshToken = await RefreshToken()

        if (refreshToken.ok) {
          setAuthenticated(true)
          return
        }
      } finally {
        setIsLoading(false)
      }
    }
    isValideToken()
  }, [])

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
          emailVerification,
          setEmailVerification,
        }}
      >
        {!isloading && children}
      </AuthContext.Provider>
    </>
  )
}
