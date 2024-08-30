import React, { createContext, useLayoutEffect, useState } from 'react'
import { AuthContextType, INotificationProps } from '../types/authTypes'
import _apiClient from '../api/api-client'
import { useCookies } from 'react-cookie'
import { toast, Bounce } from 'react-toastify'

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isloading, setIsLoading] = useState<boolean>(true)
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false)
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false)
  const [cookie] = useCookies(['__l'])

  // Check if user has a valid token
  useLayoutEffect(() => {
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

  const showNotification = ({
    message,
    type,
    timeout = 3000,
  }: INotificationProps) => {
    if (message) {
      toast(message, {
        position: 'top-center',
        autoClose: timeout,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
        type: type,
      })
    }
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
          showNotification,
        }}
      >
        {!isloading && children}
      </AuthContext.Provider>
    </>
  )
}
