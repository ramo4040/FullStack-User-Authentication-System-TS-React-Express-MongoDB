import { NextFunction, type Request, type Response, type Router } from 'express'
import { IUser } from './IUser'
import { ObjectId } from 'mongoose'

type AuthRequestHandler = (req: Request, res: Response) => Promise<void>

export interface IRoutes {
  router: Router
  registerRoutes(): void
}
export interface IRegistrationData {
  username: string
  email: string
  password: string
  confirmPassword: string
  verificationToken?: string
}
export interface IStatusMessage {
  success?: boolean
  status: number
  message?: string
  user?: Partial<IUser> | null
  isEmailVerified?: boolean
  accessToken?: string
  refreshToken?: string
}

export interface IAuthMiddleware {
  authenticateUser(req: Request, res: Response, next: NextFunction): Promise<void>
}

export interface ITokens {
  accessToken: string
  refreshToken: string
}

// _________________________________________user Auth Controllers

export interface IUserAuthController {
  register: AuthRequestHandler
  login: AuthRequestHandler
  logout: AuthRequestHandler
  findOne: AuthRequestHandler
}

export interface IUserAccountController {
  verifyEmail: AuthRequestHandler
  refreshToken: AuthRequestHandler
}

export interface IUserPasswordController {
  sendPwdForgotToken: AuthRequestHandler
}

// _________________________________________user auth Services
export interface IUserVerificationService {
  verifyEmailToken(verifyToken: string, oldAccessToken: string | null): Promise<Partial<IStatusMessage | void>>
}

export interface IPasswordResetService {
  sendPwdForgotToken(email: string): Promise<IStatusMessage>
}

export interface ITokenManagementService {
  generateLoginTokens(user: IUser): Promise<ITokens>
  handleRefreshToken(token: string): Promise<IStatusMessage>
}

export interface IUserAuthService {
  register(data: IRegistrationData): Promise<IStatusMessage>
  login(data: IRegistrationData): Promise<IStatusMessage>
  logout(userID: string): Promise<IStatusMessage>
  findOne(id: ObjectId): Promise<IUser | null>
}
