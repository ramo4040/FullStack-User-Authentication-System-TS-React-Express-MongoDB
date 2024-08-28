import { Navigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import { ValidateResetToken } from '../services/authService'

function ResetPasswordRoutes({ children }: { children: React.ReactNode }) {
  const { showNotification } = useAuth()
  const [searchParams] = useSearchParams()
  const [isValid, setIsValid] = useState<boolean>(true)

  useEffect(() => {
    const validateToken = async () => {
      const { success, message } = await ValidateResetToken(
        searchParams.get('token'),
      )

      if (!success) {
        showNotification({
          message: message as string,
          type: 'error',
        })
        setIsValid(false)
      }

      setIsValid(true)
    }
    validateToken()
  }, [searchParams])

  // Redirect based on validation result
  if (!isValid) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</> // Render children if token is valid
}

export default ResetPasswordRoutes
