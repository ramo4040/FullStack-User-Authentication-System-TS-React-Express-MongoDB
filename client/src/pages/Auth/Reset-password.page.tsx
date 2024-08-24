import AuthForm from '../../components/Forms/AuthFom'
import React, { useState } from 'react'
import { MdPassword } from 'react-icons/md'
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { ResetPasswordService } from '../../services/authService'
import ErrorMessage from '../../components/Messages/ErrorMessage'
import useAuth from '../../hooks/useAuth'

const ResetPasswordPage = () => {
  const { showNotification } = useAuth()
  const [togglePwd, setTogglePwd] = useState(false)
  const togglePassword = () => setTogglePwd(!togglePwd)
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const data = await ResetPasswordService(formData)

    if (data.status == 422 && data.message) {
      setError(data.message)
      return
    }
    showNotification({
      message: data.message as string,
      type: data.success ? 'success' : 'error',
    })
    navigate('/login')
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
            <button type="submit">Reset Password</button>
          </div>
        </div>
      </div>
    </AuthForm>
  )
}

export default ResetPasswordPage
