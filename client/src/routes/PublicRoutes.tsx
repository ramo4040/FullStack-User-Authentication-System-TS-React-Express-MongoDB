import { Outlet, Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

function PublicRoutes() {
  const { isAuthenticated, isEmailVerified } = useAuth()

  if (isAuthenticated && !isEmailVerified) {
    return <Navigate to="/verify-email" replace />
  }

  if (isAuthenticated && isEmailVerified) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}

export default PublicRoutes
