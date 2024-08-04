import { useState } from 'react'
import AuthForm from './AuthForm'
import { EyeSlashIcon, EyeIcon } from '@heroicons/react/24/outline'
import { LoginService } from '../../services/authService'
import useAuth from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [togglePwd, setTogglePwd] = useState(false)
  const togglePassword = () => setTogglePwd(!togglePwd)
  const { setIsLoading, setAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    setIsLoading(true)
    const userResponse = await LoginService(formData)
    if (userResponse.status && userResponse.user) {
      setIsLoading(false)
      setAuthenticated(true)
      navigate('/dashboard')
    }
  }

  return (
    <>
      <AuthForm
        btnTitle="Sign in"
        description="Please fill your detail to access your account."
        onSubmit={handleSubmit}
      >
        <div className="group-input">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="jhon.doe@gmail.com"
            id="email"
            name="email"
            className="input-auth"
            required
          />
        </div>
        <div className="group-input">
          <div className="forgot-password">
            <label htmlFor="password">Password</label>
            <a href="/">Forgot password ?</a>
          </div>
          <div className="group-input-icone">
            <input
              type={togglePwd ? 'text' : 'password'}
              placeholder="•••••••••"
              id="password"
              name="password"
              className="input-auth"
              required
            />
            {togglePwd ? (
              <EyeIcon
                className="h-6 w-6 text-gray-500"
                onClick={togglePassword}
              />
            ) : (
              <EyeSlashIcon
                className="h-6 w-6 text-gray-500"
                onClick={togglePassword}
              />
            )}
          </div>
        </div>
      </AuthForm>
    </>
  )
}

export default Login
