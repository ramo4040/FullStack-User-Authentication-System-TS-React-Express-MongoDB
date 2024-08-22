import { useEffect } from 'react'
import img from '../assets/images/verify-email-logo.png'
import { toast, Bounce } from 'react-toastify'
import { useCookies } from 'react-cookie'
import Button from '../components/Buttons/Btn'

const VerifyEmailPage = () => {
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
        type: 'error',
      })
    }

    if (cookie.__emailIsVerified) {
      notify('Invalid Verification Link.')
      removeCookie('__emailIsVerified')
    }
  }, [])

  const handleSubmit = () => {
    return
  }

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
          <Button id="resend-email" type="button" onClick={handleSubmit}>
            Resend email
          </Button>
        </section>
      </div>
    </div>
  )
}

export default VerifyEmailPage
