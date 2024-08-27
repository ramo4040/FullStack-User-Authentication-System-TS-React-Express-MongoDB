import { useEffect } from 'react'
import { FaArrowRightLong } from 'react-icons/fa6'
import { useCookies } from 'react-cookie'
import Button from '../../components/Buttons/Btn'
import { SiMinutemailer } from 'react-icons/si'
import useAuth from '../../hooks/useAuth'
import _apiClient from '../../api/api-client'
import { useNavigate } from 'react-router-dom'

const VerifyEmailPage = () => {
  const [cookie, , removeCookie] = useCookies(['__emailIsVerified'])
  const { setAuthenticated, setIsEmailVerified, showNotification } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (cookie.__emailIsVerified) {
      showNotification({
        message: 'Invalid Verification Link.',
        type: 'error',
      })
      removeCookie('__emailIsVerified')
    }
  }, [])

  const handleSubmit = async () => {
    try {
      await _apiClient.get('/auth/logout')
      setAuthenticated(false)
      setIsEmailVerified(false)
      localStorage.removeItem('loggedIn')
    } finally {
      navigate('/login')
    }
  }

  return (
    <div className="verify-email-container">
      <SiMinutemailer color="fff" size={'3.5rem'} />

      <section>
        <h1>Check your email</h1>
        <p>We just sent a verification link to your email</p>
      </section>

      <Button type="button" onClick={handleSubmit}>
        Go to Login <FaArrowRightLong />
      </Button>
    </div>
  )
}

export default VerifyEmailPage
