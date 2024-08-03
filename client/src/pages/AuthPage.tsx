import { Routes, Route } from 'react-router-dom'
import AsideAuth from '../components/Auth/AsideAuth'
import Login from '../components/Auth/Login'

const AuthPage = () => {
  return (
    <main className="auth_container">
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* <Route path="/register" element={<Login />} /> */}
        </Routes>
        <AsideAuth />
      </div>
    </main>
  )
}

export default AuthPage
