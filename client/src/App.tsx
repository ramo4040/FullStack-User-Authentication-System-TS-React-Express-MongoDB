import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/Auth/ProtectedRoute'
import AuthRoutes from './routes/AuthRoutes.routes'
import DashboardRoutes from './routes/Dashboard.routes'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/**userAuth pages */}
          <Route path="/auth/*" element={<AuthRoutes />} />
          {/**Protected Routes*/}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard/*" element={<DashboardRoutes />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
