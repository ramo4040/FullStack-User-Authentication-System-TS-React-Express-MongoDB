import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

function PrivateRoutes() {
  const { isAuthenticated, isEmailVerified } = useAuth()

  if (!isEmailVerified) {
    return <Navigate to="/verify-email" replace />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  return <Outlet />
}

export default PrivateRoutes
