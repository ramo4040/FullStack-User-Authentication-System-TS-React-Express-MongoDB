import { Link, useNavigate } from 'react-router-dom'
import { LuFingerprint } from 'react-icons/lu'
import { IoIosArrowBack } from 'react-icons/io'

import { useState } from 'react'
import { ForgotPasswordService } from '../services/authService'
import AuthForm from '../components/Forms/AuthFom'

const ForgotPasswordPage = () => {
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
    navigate('/login')
  }

  return (
    <AuthForm hasHeader={false} onSubmit={handleSubmit}>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="forgotPwd-icon">
            <LuFingerprint size={'1.8rem'} />
          </div>
          <div>
            <h1>Forgot Password ?</h1>
            <p>No worries, we'll send you reset instructions.</p>
          </div>
          <div className="group-input-container">
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
                <button type="submit">Reset Password</button>
                <div className="forgot-password-back">
                  <IoIosArrowBack />
                  <Link to="/login">Back to Log in</Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </AuthForm>
  )
}

export default ForgotPasswordPage
