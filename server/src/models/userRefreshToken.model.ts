import { IUserToken } from '@/core/interfaces/Auth'
import { Model, model, Schema, Types } from 'mongoose'

const userRefreshToken = new Schema<IUserToken>(
  {
    userId: { type: Types.ObjectId },
    token: { type: String, required: true },
  },
  { collection: 'userRefreshToken' },
)

const UserRefreshTokenModel: Model<IUserToken> = model('userRefreshTokenModel', userRefreshToken)

export default UserRefreshTokenModel
