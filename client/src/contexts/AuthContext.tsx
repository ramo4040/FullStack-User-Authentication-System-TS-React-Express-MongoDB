import React, { createContext, useEffect, useState } from 'react'
import { AuthContextType } from '../types/authTypes'
import { ValidateUserService } from '../services/authService'

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isloading, setIsLoading] = useState<boolean>(true)
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false)

  //check if user has a valid token
  useEffect(() => {
    const isValideToken = async () => {
      const response = await ValidateUserService()
      if (response.ok) {
        setIsLoading(false)
        setAuthenticated(true)
        return
      }
      setIsLoading(false)
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
        }}
      >
        {!isloading && children}
      </AuthContext.Provider>
    </>
  )
}
