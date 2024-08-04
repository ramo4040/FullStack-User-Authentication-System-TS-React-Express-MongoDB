import Login from '../components/Auth/Login'
import withAuthLayout from '../components/HOC/withAuthLayout'

const LoginPage = () => {
  return withAuthLayout(<Login />)
}

export default LoginPage
