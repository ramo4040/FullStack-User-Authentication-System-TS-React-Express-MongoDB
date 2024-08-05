import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import useAuth from '../hooks/useAuth'
import RegisterPage from '../pages/RegisterPage'
import VerifyEmailPage from '../pages/verify-email.page'

const AuthRoutes = () => {
  const { isAuthenticated, emailVerification } = useAuth()

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      {emailVerification && (
        <Route path="/verify-email" element={<VerifyEmailPage />} />
      )}
    </Routes>
  )
}

export default AuthRoutes
