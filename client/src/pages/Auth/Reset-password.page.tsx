import AuthForm from '../../components/Forms/AuthFom'
import React, { useState } from 'react'
import { MdPassword } from 'react-icons/md'
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'
import { ResetPasswordService } from '../../services/authService'
import ErrorMessage from '../../components/Messages/ErrorMessage'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import useLoader from '../../hooks/useLoader'

const ResetPasswordPage = () => {
  const [togglePwd, setTogglePwd] = useState(false)
  const togglePassword = () => setTogglePwd(!togglePwd)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { showNotification } = useAuth()
  const { isLoading, showLoading, hideLoading, LoaderElement } = useLoader()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    showLoading()
    const formData = new FormData(e.target as HTMLFormElement)
    const data = await ResetPasswordService(formData, searchParams.get('token'))

    if (!data.success && data.message) {
      hideLoading()
      setError(data.message)
      return
    }

    navigate('/login')
    showNotification({ message: data.message as string, type: 'success' })
  }

  return (
    <AuthForm hasHeader={false} onSubmit={handleSubmit}>
      <div className="forgotPassword-container">
        <div className="forgotPwd-icon">
          <MdPassword size={'1.8rem'} />
        </div>
        <div>
          <h1>Set new Password</h1>
          <p>Must be at least 8 characters.</p>
        </div>
        <div className="group-input-container">
          {error && <ErrorMessage message={error} />}
          <div className="group-input">
            <label htmlFor="password">Password</label>
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
                <IoEyeOutline size={'1.1rem'} onClick={togglePassword} />
              ) : (
                <IoEyeOffOutline size={'1.1rem'} onClick={togglePassword} />
              )}
            </div>

            <div className="group-input">
              <label htmlFor="cPassword">Confirm password</label>
              <input
                type={togglePwd ? 'text' : 'password'}
                placeholder="•••••••••"
                id="cPassword"
                name="confirmPassword"
                className="input-auth"
                required
              />
            </div>
          </div>
          <div className="group-btn">
            <button type="submit" disabled={isLoading}>
              {isLoading ? LoaderElement({ size: '1rem' }) : 'Reset Password'}
            </button>
          </div>
        </div>
      </div>
    </AuthForm>
  )
}

export default ResetPasswordPage
