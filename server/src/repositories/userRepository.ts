import { IRegistrationData } from '@/core/interfaces/IAuth'
import { IUser, IUserRepository } from '@/core/interfaces/IUser'
import { UserModel } from '@/models/user.model'
import { injectable } from 'inversify'
import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose'

@injectable()
export default class UserRepository implements IUserRepository<IUser> {
  /**
   * @param data object containing the user information
   * @returns user model instance
   */
  async createUserModel(data: IRegistrationData): Promise<IUser> {
    return new UserModel({
      ...data,
    })
  }

  /**
   * @param user user model instance
   * @returns promise user object from mongodb
   */
  async saveUser(user: IUser): Promise<IUser> {
    return await user.save()
  }

  /**
   *
   * @param email user email @type String
   * @returns user if found if not return null
   */
  async findOne(data: FilterQuery<IUser>): Promise<IUser | null> {
    return await UserModel.findOne(data).exec()
  }

  async update(filter: FilterQuery<IUser>, data: UpdateQuery<IUser>, options: QueryOptions): Promise<IUser | null> {
    return await UserModel.findOneAndUpdate(filter, data, options)
  }
}
