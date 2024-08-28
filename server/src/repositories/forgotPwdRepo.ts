import { ITokenRepo, IUserToken } from '@/core/interfaces/Auth'
import userForgotPwdModel from '@/models/userForgotPwdToken.model'
import { injectable } from 'inversify'
import { ObjectId } from 'mongoose'

@injectable()
export default class ForgotPwdRepo implements ITokenRepo<IUserToken> {
  async create(userId: ObjectId, token: string): Promise<void> {
    await userForgotPwdModel.create({
      userId: userId,
      token: token,
    })
  }

  async findByUserId(userId: string | ObjectId, token: string): Promise<IUserToken | null> {
    return await userForgotPwdModel.findOneAndUpdate(
      { userId: userId },
      {
        token: token,
        userId: userId,
      },
      { upsert: true },
    )
  }

  async deleteByUserId(userId: string | ObjectId): Promise<IUserToken | null> {
    return await userForgotPwdModel.findOneAndDelete({ userId: userId })
  }
}
