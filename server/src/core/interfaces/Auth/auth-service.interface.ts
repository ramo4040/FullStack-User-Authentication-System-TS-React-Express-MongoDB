import { ObjectId } from 'mongoose'
import { IRegistrationData, IStatusMessage, ITokens, IUser } from './objects.interface'

type PromiseIStatus = Promise<IStatusMessage>
export interface IUserVerificationService {
  verifyEmailToken(verifyToken: string, oldAccessToken: string | null): Promise<Partial<IStatusMessage | void>>
}

export interface IPasswordResetService {
  sendPwdForgotToken(email: string): PromiseIStatus
  verifyToken(token: string): PromiseIStatus
  updatePassword(userId: string, newPwd: string): PromiseIStatus
}

export interface ITokenManagementService {
  generateLoginTokens(user: IUser): Promise<ITokens>
  handleRefreshToken(token: string): PromiseIStatus
}

export interface IUserAuthService {
  register(data: IRegistrationData): PromiseIStatus
  login(data: IRegistrationData): PromiseIStatus
  logout(userID: string): PromiseIStatus
  findOne(id: ObjectId): Promise<IUser | null>
}

export interface IGoogleAuthService {
  authenticate(): string
  callback(code: string): Promise<IStatusMessage | void>
}
