import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/Auth/ProtectedRoute'
import ProtectedPage from './pages/ProtectedPage'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/**userAuth pages */}
          <Route path="/auth/*" element={<AuthPage />} />
          {/**Protected Routes*/}
          <Route element={<ProtectedRoute />}>
            <Route path="/*" element={<ProtectedPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
