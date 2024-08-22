import AuthForm from '../components/Forms/AuthFom'
import React, { useState } from 'react'
import { MdPassword } from 'react-icons/md'
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { ResetPasswordService } from '../services/authService'
const ResetPasswordPage = () => {
  const [togglePwd, setTogglePwd] = useState(false)
  const togglePassword = () => setTogglePwd(!togglePwd)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    await ResetPasswordService(formData)
    navigate('/login')
  }

  return (
    <AuthForm hasHeader={false} onSubmit={handleSubmit}>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="forgotPwd-icon">
            <MdPassword size={'1.8rem'} />
          </div>
          <div>
            <h1>Set new Password</h1>
            <p>Must be at least 8 characters.</p>
          </div>
          <div className="group-input-container">
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
        </form>
      </div>
    </AuthForm>
  )
}

export default ResetPasswordPage
