import { useNavigate } from 'react-router-dom'
import _apiClient from '../api/api-client'
import useAuth from '../hooks/useAuth'
import { toast, Bounce } from 'react-toastify'
import { useCookies } from 'react-cookie'
import { useEffect } from 'react'

const DashBoardPage = () => {
  const { setAuthenticated, setIsEmailVerified } = useAuth()
  const navigate = useNavigate()
  const [cookie, , removeCookie] = useCookies(['__emailIsVerified'])

  useEffect(() => {
    const notify = (message: string) => {
      toast(message, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
        type: 'success',
      })
    }

    if (cookie.__emailIsVerified) {
      notify('Your email address has been successfully verified.')
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
    <button id="logOut" onClick={handleSubmit}>
      Log out
    </button>
  )
}

export default DashBoardPage
