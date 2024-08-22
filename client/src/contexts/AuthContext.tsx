import React, { createContext, useEffect, useState } from 'react'
import { AuthContextType } from '../types/authTypes'
import _apiClient from '../api/api-client'
import { useCookies } from 'react-cookie'

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isloading, setIsLoading] = useState<boolean>(true)
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false)
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false)

  const [cookie] = useCookies(['__l'])

  // Check if user has a valid token
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await _apiClient.get('/me')
        setIsEmailVerified(user.data.isEmailVerified)
        setAuthenticated(true)
      } catch (error) {
        setAuthenticated(false)
        setIsEmailVerified(false)
      } finally {
        setIsLoading(false)
      }
    }

    if (cookie.__l) {
      checkAuth()
    } else {
      setIsLoading(false)
    }
  }, [])

  const logOut = async () => {
    setAuthenticated(false)
    setIsEmailVerified(false)
  }

  return (
    <>
      <AuthContext.Provider
        value={{
          logOut,
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
