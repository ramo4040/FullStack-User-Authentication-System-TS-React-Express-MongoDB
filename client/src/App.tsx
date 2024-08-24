import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import PublicRoutes from './routes/PublicRoutes'
import PrivateRoutes from './routes/PrivateRoutes'
import VerifyEmailRoutes from './routes/verifyEmailRoutes'
import { ToastContainer } from 'react-toastify'
import ForgotPasswordPage from './pages/Auth/Forgot-password.page'
import ResetPasswordPage from './pages/Auth/Reset-password.page'
import AuthLayout from './Layout/AuthLayout'
import LoginPage from './pages/Auth/LoginPage'
import RegisterPage from './pages/Auth/RegisterPage'
import VerifyEmailPage from './pages/Auth/verify-email.page'
import DashBoardPage from './pages/DahsboardPage'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <AuthProvider>
        <Routes>
          {/** User Auth pages */}
          <Route path="/" element={<PublicRoutes />}>
            <Route element={<AuthLayout />}>
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="forgot-password" element={<ForgotPasswordPage />} />
              <Route path="reset-password" element={<ResetPasswordPage />} />
            </Route>
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
