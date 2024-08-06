import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import img from '../assets/images/verify-email-logo.png'
import useAuth from '../hooks/useAuth'
import { useEffect } from 'react'
import { verifyEmailService } from '../services/authService'

const VerifyEmailPage = () => {
  const { isEmailVerified, setIsEmailVerified } = useAuth()

  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const navigate = useNavigate()

  useEffect(() => {
    const verifyEmail = async () => {
      if (token) {
        const response = await verifyEmailService(token)
        if (response.success) {
          setIsEmailVerified(true)
          navigate('/dashboard')
        }
      }
    }
    verifyEmail()
  }, [])

  if (isEmailVerified) {
    return <Navigate to="/dashboard" />
  }

  const handleSubmit = () => {}

  return (
    <div className="verify-email-container">
      <div>
        <header>
          <h1>Verify your email</h1>
          <p>You will need to verify your email to complete registration</p>
        </header>
        <section>
          <img src={img} />
          <p>
            An email has been sent with a link to verify your account. If you
            have not received the email after a few minutes, please check your
            spam folder
          </p>
          <button id="resend-email" onSubmit={handleSubmit}>
            Resend email
          </button>
        </section>
      </div>
    </div>
  )
}

export default VerifyEmailPage
