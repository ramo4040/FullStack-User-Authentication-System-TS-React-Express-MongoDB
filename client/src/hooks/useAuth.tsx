import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { AuthContextType } from '../types/authTypes'

const useAuth = (): AuthContextType => {
  return useContext(AuthContext)
}

export default useAuth
