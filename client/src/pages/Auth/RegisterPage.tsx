import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'
import AuthForm from '../../components/Forms/AuthFom'
import { RegisterService } from '../../services/authService'
import Button from '../../components/Buttons/Btn'
import ErrorMessage from '../../components/Messages/ErrorMessage'
import useAuth from '../../hooks/useAuth'
import useLoader from '../../hooks/useLoader'

const RegisterPage = () => {
  const { showNotification } = useAuth()
  const [isError, setError] = useState<string | undefined>('')
  const [togglePwd, setTogglePwd] = useState(false)
  const togglePassword = () => setTogglePwd(!togglePwd)
  const navigate = useNavigate()
  const { isLoading, showLoading, hideLoading, LoaderElement } = useLoader()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    showLoading()
    const formData = new FormData(e.target as HTMLFormElement)
    const response = await RegisterService(formData)

    if (response.success) {
      navigate('/login')
      showNotification({
        message: "Registration successful! Don't forget to verify your email.",
        type: 'success',
      })
      return
    }

    hideLoading()
    setError(response.message)
  }

  const handleGoogleSubmit = async () => {
    showLoading()
    window.location.href =
      'http://localhost:3000/api/v1/auth/google/authenticate'
  }

  return (
    <AuthForm
      title="Sign Up"
      description="Sign up and start exploring!"
      onSubmit={handleSubmit}
    >
      {/**Error message */}
      {isError && <ErrorMessage message={isError} />}

      {/**group inputs */}
      <div className="group-input">
        <label htmlFor="email">Username</label>
        <input
          type="text"
          placeholder="jhon.doe"
          id="username"
          name="username"
          className="input-auth"
          required
        />
      </div>

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
      </div>

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

      {/** submit buttons */}
      <div className="group-btn">
        <Button type="submit">
          {isLoading ? LoaderElement({ size: '1rem' }) : 'Sign up'}
        </Button>

        <Button id="google-btn" type="button" onClick={handleGoogleSubmit}>
          {isLoading ? (
            LoaderElement({ size: '1rem' })
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="20"
              height="20"
              viewBox="0 0 48 48"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              ></path>
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
            </svg>
          )}

          {isLoading ? null : 'Continue with Google'}
        </Button>

        <p>
          Already has an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </AuthForm>
  )
}

export default RegisterPage
