import { Request, Response } from 'express'
import { IRegistrationData } from './IAuth'
import { Document, ObjectId } from 'mongoose'

export interface IUser extends Document {
  _id: ObjectId
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

export interface IUserRefreshToken extends Document {
  _id: ObjectId
  userId: ObjectId
  refreshToken: string
}

export interface IUserRepository<T> {
  createUserModel(data: IRegistrationData): Promise<IUser>
  saveUser(user: IUser): Promise<IUser>
  findOne(data: Partial<IUser>): Promise<T | null>
  update(filter: Partial<T>, data: UpdateData): Promise<T | null>
  //   findAll(): Promise<T[]>;
  //   delete(id: string): Promise<T | null>;
}

export interface IUserController {
  findOne(req: Request, res: Response): Promise<void>
  //   findAll(): Promise<T[]>;
  //   delete(id: string): Promise<T | null>;
}

export interface IRefreshTokenRepo<T> {
  create(userId: ObjectId, refreshToken: string): Promise<void>
  findByUserId(userId: string | ObjectId, newRefreshToken: string): Promise<T | null>
  deleteByUserId(userId: string): Promise<IUserRefreshToken | null>
}
