import img from '../assets/images/verify-email-logo.png'
const VerifyEmailPage = () => {
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
