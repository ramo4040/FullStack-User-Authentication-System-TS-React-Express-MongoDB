import { Outlet } from 'react-router-dom'
import img from '../assets/images/authImage.png'

const AuthLayout = () => {
  return (
    <main className="auth_container">
      <div>
        <Outlet />
        <aside>
          <img src={img} alt="" />
        </aside>
      </div>
    </main>
  )
}

export default AuthLayout
