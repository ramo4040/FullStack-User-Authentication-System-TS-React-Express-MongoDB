import { ITokenRepo, IUserToken } from '@/core/interfaces/IUser'
import UserRefreshTokenModel from '@/models/userRefreshToken.model'
import { injectable } from 'inversify'
import { ObjectId } from 'mongoose'

@injectable()
export default class RefreshTokenRepo implements ITokenRepo<IUserToken> {
  async create(userId: ObjectId, refreshToken: string): Promise<void> {
    await UserRefreshTokenModel.create({ userId: userId, token: refreshToken })
  }

  async findByUserId(userId: string | ObjectId, newRefreshToken: string): Promise<IUserToken | null> {
    return await UserRefreshTokenModel.findOneAndUpdate(
      { userId: userId },
      { token: newRefreshToken, userId: userId },
      { upsert: true },
    )
  }

  async deleteByUserId(userId: string): Promise<IUserToken | null> {
    return await UserRefreshTokenModel.findOneAndDelete({ userId: userId })
  }
}
