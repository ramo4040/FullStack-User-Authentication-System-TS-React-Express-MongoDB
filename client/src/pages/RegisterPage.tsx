import Register from '../components/Auth/Register'
import withAuthLayout from '../components/HOC/withAuthLayout'

const RegisterPage = () => {
  return withAuthLayout(<Register />)
}

export default RegisterPage
