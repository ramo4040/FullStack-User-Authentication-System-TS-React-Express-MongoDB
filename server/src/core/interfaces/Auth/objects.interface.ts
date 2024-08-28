import { Document, ObjectId } from 'mongoose'

export interface IRegistrationData {
  googleId: string
  username: string
  email: string
  password?: string | null
  confirmPassword?: string
  isEmailVerified?: boolean
}

export interface IStatusMessage {
  success: boolean
  status: number
  message?: string
  user?: Partial<IUser> | null
  isEmailVerified?: boolean
  accessToken?: string
  refreshToken?: string
}

export interface ITokens {
  accessToken: string
  refreshToken: string
}

export interface IUser extends Document {
  _id: ObjectId | string
  googleId: string
  username: string
  email: string
  verificationToken?: string | undefined
  isEmailVerified: boolean
  password: string
}
export interface UpdateData {
  $set?: Partial<IUser>
  $unset?: { [key in keyof IUser]?: '' }
}

export interface IUserToken extends Document {
  _id: ObjectId
  userId: ObjectId
  token: string
}

export interface IGoogleUserPayload {
  sub: string // Subject (unique identifier for the user)
  email: string // User's email address
  email_verified: boolean // Indicates if the email is verified
  name: string // User's full name
  picture: string // URL of the user's profile picture
  given_name: string // User's given name
  family_name: string // User's family name
}

export interface IJwtPayload extends IUser {
  _id: string | ObjectId
  iat: number
  exp: number
}
