import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import AuthGuard from './components/Auth/AuthGuard'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import VerifyEmailPage from './pages/verify-email.page'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/** User Auth pages */}
          <Route path="/" element={<AuthGuard isPrivate={false} />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>

          <Route path="/verify-email">
            <Route index element={<VerifyEmailPage />} />
            <Route path="/verify-email?token" element={<VerifyEmailPage />} />
          </Route>

          {/** Protected Routes */}
          <Route path="/" element={<AuthGuard isPrivate />}>
            <Route
              path="dashboard"
              Component={() => <h1>Protected Route</h1>}
            />
          </Route>

          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
