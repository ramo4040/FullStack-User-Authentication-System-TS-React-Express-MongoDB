import { ObjectId, QueryOptions, UpdateQuery } from 'mongoose'
import { IRegistrationData, IUserToken } from './objects.interface'

export interface IUserRepository<T> {
  createUserModel(data: IRegistrationData): Promise<T>
  saveUser(user: T): Promise<T>
  findOne(data: Partial<T>): Promise<T | null>
  update(filter: Partial<T>, data: UpdateQuery<T>, options: QueryOptions): Promise<T | null>
}

export interface ITokenRepo<T> {
  create(userId: ObjectId, token: string): Promise<void>
  findByUserId(userId: string | ObjectId, token: string): Promise<T | null>
  deleteByUserId(userId: string | ObjectId): Promise<IUserToken | null>
}
