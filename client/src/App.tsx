import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import VerifyEmailPage from './pages/verify-email.page'
import PublicRoutes from './routes/PublicRoutes'
import PrivateRoutes from './routes/PrivateRoutes'
import VerifyEmailRoutes from './routes/verifyEmailRoutes'
import DashBoardPage from './pages/DahsboardPage'
import { ToastContainer } from 'react-toastify'
import ForgotPasswordPage from './pages/Forgot-password.page'
import ResetPasswordPage from './pages/Reset-password.page'
import AuthLayout from './Layout/AuthLayout'

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <AuthProvider>
        <Routes>
          {/** User Auth pages */}
          <Route path="/" element={<PublicRoutes /> && <AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="reset-password" element={<ResetPasswordPage />} />
          </Route>

          <Route
            path="verify-email"
            element={
              <VerifyEmailRoutes>
                <VerifyEmailPage />
              </VerifyEmailRoutes>
            }
          />

          {/** Protected Routes */}
          <Route path="/" element={<PrivateRoutes />}>
            <Route path="dashboard" element={<DashBoardPage />} />
          </Route>

          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
