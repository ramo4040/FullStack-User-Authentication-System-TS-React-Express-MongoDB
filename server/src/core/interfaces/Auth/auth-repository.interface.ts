import { ObjectId, QueryOptions, UpdateQuery } from 'mongoose'
import { IRegistrationData, IUser, IUserToken } from './objects.interface'

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
