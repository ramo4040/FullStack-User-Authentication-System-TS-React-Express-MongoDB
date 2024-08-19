import { Document, ObjectId, QueryOptions, UpdateQuery } from 'mongoose'
import { IRegistrationData } from './IAuth'

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

export interface IUserRepository<T> {
  createUserModel(data: IRegistrationData): Promise<IUser>
  saveUser(user: IUser): Promise<IUser>
  findOne(data: Partial<IUser>): Promise<T | null>
  update(filter: Partial<T>, data: UpdateQuery<IUser>, options: QueryOptions): Promise<T | null>
}

export interface ITokenRepo<T> {
  create(userId: ObjectId, token: string): Promise<void>
  findByUserId(userId: string | ObjectId, token: string): Promise<T | null>
  deleteByUserId(userId: string | ObjectId): Promise<IUserToken | null>
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
