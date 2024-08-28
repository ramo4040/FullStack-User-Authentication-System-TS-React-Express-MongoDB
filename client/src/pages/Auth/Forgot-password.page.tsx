import { Link, useNavigate } from 'react-router-dom'
import { LuFingerprint } from 'react-icons/lu'
import { IoIosArrowBack } from 'react-icons/io'

import { useState } from 'react'
import { ForgotPasswordService } from '../../services/authService'
import AuthForm from '../../components/Forms/AuthFom'
import useAuth from '../../hooks/useAuth'

const ForgotPasswordPage = () => {
  const { showNotification } = useAuth()
  const [error, setError] = useState<string>('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const { success, message } = await ForgotPasswordService(formData)
    if (!success && message) {
      setError(message)
      return
    }

    showNotification({
      message: 'A password reset link has been sent to your email.',
      type: 'success',
    })
    navigate('/login')
  }

  return (
    <AuthForm hasHeader={false} onSubmit={handleSubmit}>
      <div className="forgotPassword-container">
        <div className="forgotPwd-icon">
          <LuFingerprint size={'1.8rem'} />
        </div>
        <div>
          <h1>Forgot Password ?</h1>
          <p>No worries, we'll send you reset instructions.</p>
        </div>
        {error && <div className="error-msg">{error}</div>}
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
          <div className="group-btn">
            <button type="submit">Send link to email</button>
            <div className="forgot-password-back">
              <IoIosArrowBack />
              <Link to="/login">Back to Log in</Link>
            </div>
          </div>
        </div>
      </div>
    </AuthForm>
  )
}

export default ForgotPasswordPage
