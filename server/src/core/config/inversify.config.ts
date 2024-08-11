import { Container } from 'inversify'
import TYPES from '../constants/TYPES'
import AuthRoutes from '@/routes/auth/authRoutes'
import BaseRoutes from '@/routes/baseRoutes'
import PasswordHasher from '@/utils/passwordHasher'
import UserRepository from '@/repositories/userRepository'
import AuthToken from '@/utils/authToken'
import AuthMiddleware from '@/middlewares/authMiddleware'
import RefreshTokenRepo from '@/repositories/refreshTokenRepo'
import AuthValidator from '@/validator/authValidator'
import NodeMailer from '@/utils/mailer'
import UserRoutes from '@/routes/auth/userRoutes'
import UserAuthService from '@/services/auth/userAuthService'
import PasswordResetService from '@/services/auth/passwordResetService'
import TokenManagementService from '@/services/auth/tokenManagementService'
import UserVerificationService from '@/services/auth/userVerificationService'
import UserAuthController from '@/controllers/auth/userAuthController'
import UserAccountController from '@/controllers/auth/userAccountController'

const container = new Container()

//auth routes
container.bind(TYPES.BaseRoutes).to(BaseRoutes)
container.bind(TYPES.AuthRoutes).to(AuthRoutes)
container.bind(TYPES.UserRoutes).to(UserRoutes)

//user authentication services
container.bind(TYPES.UserAuthService).to(UserAuthService)
container.bind(TYPES.PasswordResetService).to(PasswordResetService)
container.bind(TYPES.TokenManagementService).to(TokenManagementService)
container.bind(TYPES.UserVerificationService).to(UserVerificationService)

//user authentication Controllers
container.bind(TYPES.UserAuthController).to(UserAuthController)
container.bind(TYPES.UserAccountController).to(UserAccountController)
// container.bind(TYPES.UserPasswordController).to(UserAccountController)

//middleware
container.bind(TYPES.AuthMiddleware).to(AuthMiddleware)

//Utils
container.bind(TYPES.PasswordHasher).to(PasswordHasher)
container.bind(TYPES.AuthToken).to(AuthToken)
container.bind(TYPES.NodeMailer).to(NodeMailer)

//user
container.bind(TYPES.UserRepository).to(UserRepository)
container.bind(TYPES.RefreshTokenRepo).to(RefreshTokenRepo)

// Validator
container.bind(TYPES.AuthValidator).to(AuthValidator)

export default container
