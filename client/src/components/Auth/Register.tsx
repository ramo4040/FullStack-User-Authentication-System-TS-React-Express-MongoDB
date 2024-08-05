import React, { useState } from 'react'
import AuthForm from './AuthForm'
import { EyeSlashIcon, EyeIcon } from '@heroicons/react/24/outline'
import { RegisterService } from '../../services/authService'

const Register = () => {
  const [isError, setError] = useState<string>('')
  const [togglePwd, setTogglePwd] = useState(false)
  const togglePassword = () => setTogglePwd(!togglePwd)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const response = await RegisterService(formData)
    if (response.success) {
      return
    }
    setError(response.message)
  }

  return (
    <AuthForm
      btnTitle="Sign Up"
      description="Sign up and start exploring!"
      onSubmit={handleSubmit}
    >
      {isError && <div className="error-msg">{isError}</div>}
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
            <EyeIcon
              className="h-6 w-6 text-gray-500"
              onClick={togglePassword}
            />
          ) : (
            <EyeSlashIcon
              className="h-6 w-6 text-gray-500"
              onClick={togglePassword}
            />
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
    </AuthForm>
  )
}

export default Register
