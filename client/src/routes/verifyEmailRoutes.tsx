import { Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

interface VerifyEmailRoutesProps {
  children: React.ReactNode
}

function VerifyEmailRoutes({ children }: VerifyEmailRoutesProps) {
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
