import { ObjectId } from 'mongoose'
import { IRegistrationData, IStatusMessage, ITokens, IUser } from './objects.interface'

export interface IUserVerificationService {
  verifyEmailToken(verifyToken: string, oldAccessToken: string | null): Promise<Partial<IStatusMessage | void>>
}

export interface IPasswordResetService {
  sendPwdForgotToken(email: string): Promise<IStatusMessage>
  verifyToken(token: string): Promise<IStatusMessage>
  updatePassword(userId: string, newPwd: string): Promise<IStatusMessage>
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

export interface IGoogleAuthService {
  authenticate(): string
  callback(code: string): Promise<IStatusMessage | void>
}
