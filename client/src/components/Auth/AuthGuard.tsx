import { Outlet, Navigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

interface AuthGuardProps {
  isPrivate?: boolean
}

const AuthGuard = ({ isPrivate }: AuthGuardProps) => {
  const { isEmailVerified, isAuthenticated } = useAuth()

  if (isPrivate) {
    if (!isAuthenticated) {
      return <Navigate to="/login" />
    }
    if (!isEmailVerified) {
      return <Navigate to="/verify-email" />
    }
  }

  if (!isPrivate) {
    if (isAuthenticated && !isEmailVerified) {
      return <Navigate to="/verify-email" />
    }
    if (isAuthenticated && isEmailVerified) {
      return <Navigate to="/dashboard" />
    }
  }

  return <Outlet />
}

export default AuthGuard
