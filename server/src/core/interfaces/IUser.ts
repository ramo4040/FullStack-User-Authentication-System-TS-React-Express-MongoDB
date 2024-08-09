import { Request, Response } from 'express'
import { IRegistrationData } from './IAuth'
import { Document, ObjectId } from 'mongoose'

export interface IUser extends Document {
  _id: ObjectId
  username: string
  email: string
  password: string
  isEmailVerified: boolean
}

export interface IUserRefreshToken extends Document {
  _id: ObjectId
  userId: ObjectId
  refreshToken: string
}

export interface IUserRepository<T> {
  createUser(data: IRegistrationData): Promise<T>
  findOne(data: Partial<T>): Promise<T | null>
  update(filter: Partial<T>, data: Partial<T>): Promise<T | null>
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
