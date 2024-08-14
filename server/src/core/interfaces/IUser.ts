import { IRegistrationData } from './IAuth'
import { Document, ObjectId } from 'mongoose'

export interface IUser extends Document {
  _id: ObjectId | string
  username: string
  email: string
  verificationToken: string | undefined
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
  update(filter: Partial<T>, data: UpdateData): Promise<T | null>
}

export interface ITokenRepo<T> {
  create(userId: ObjectId, token: string): Promise<void>
  findByUserId(userId: string | ObjectId, token: string): Promise<T | null>
  deleteByUserId(userId: string | ObjectId): Promise<IUserToken | null>
}
