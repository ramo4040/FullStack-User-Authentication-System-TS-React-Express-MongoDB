import { Navigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import { ValidateResetToken } from '../services/authService'
import useLoader from '../hooks/useLoader'

function ResetPasswordRoutes({ children }: { children: React.ReactNode }) {
  const { showNotification } = useAuth()
  const [searchParams] = useSearchParams()
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const { showLoading, hideLoading, LoaderElement } = useLoader()

  useEffect(() => {
    const validateToken = async () => {
      showLoading()

      const { success, message } = await ValidateResetToken(
        searchParams.get('token'),
      )

      if (!success) {
        showNotification({
          message: message as string,
          type: 'error',
        })
        hideLoading()
        setIsValid(false)
      } else {
        hideLoading()
        setIsValid(true)
      }
    }

    validateToken()
  }, [searchParams, showNotification])

  if (isValid === null) {
    return LoaderElement({})
  }

  if (!isValid) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export default ResetPasswordRoutes
