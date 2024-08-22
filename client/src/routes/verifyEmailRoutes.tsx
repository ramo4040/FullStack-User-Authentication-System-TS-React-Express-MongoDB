import { Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

function VerifyEmailRoutes({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isEmailVerified } = useAuth()

  if (isEmailVerified) {
    return <Navigate to="/dashboard" replace />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export default VerifyEmailRoutes
