import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <main className="auth_container">
      <div>
        <Outlet />
        <aside></aside>
      </div>
    </main>
  )
}

export default AuthLayout
