import { ObjectId } from 'mongoose'
import { IUser } from './IUser'

export interface IPasswordHasher {
  hashPassword(password: string): Promise<string>
  comparePassword(password: string, hashedPwd: string): Promise<boolean>
}

export interface IAuthToken {
  generateAccessToken(data: IUser): Promise<string>
  generateRefreshToken(data: IUser): Promise<string>
  generateEmailToken(id: string): Promise<string>
  verify(token: string, key: string): Promise<IJwtPayload | null>
}

export interface IJwtPayload extends IUser {
  _id: string | ObjectId
  iat: number
  exp: number
}

export interface INodeMailer {
  sendVerificationEmail(email: string, token: string): Promise<void>
  sendForgotPwdEmail(email: string): Promise<void>
}
