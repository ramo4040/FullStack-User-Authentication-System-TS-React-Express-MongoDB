import { useNavigate } from 'react-router-dom'
import _apiClient from '../api/api-client'
import useAuth from '../hooks/useAuth'
import { useCookies } from 'react-cookie'
import { useEffect } from 'react'

const DashBoardPage = () => {
  const { setAuthenticated, setIsEmailVerified, showNotification } = useAuth()
  const navigate = useNavigate()
  const [cookie, , removeCookie] = useCookies(['__emailIsVerified'])

  useEffect(() => {
    if (cookie.__emailIsVerified) {
      removeCookie('__emailIsVerified')
      showNotification({
        message: 'Your email address has been successfully verified.',
        type: 'success',
      })
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
    <>
      <button id="logOut" onClick={handleSubmit}>
        Log out
      </button>
    </>
  )
}

export default DashBoardPage
