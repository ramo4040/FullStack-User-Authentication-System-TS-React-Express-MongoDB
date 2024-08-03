import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />
  }

  return <Outlet />
}

export default ProtectedRoute
