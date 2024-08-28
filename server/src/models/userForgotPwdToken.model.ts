import { IUserToken } from '@/core/interfaces/Auth'
import { model, Model, Schema, Types } from 'mongoose'

const schema = new Schema<IUserToken>(
  {
    userId: { type: Types.ObjectId, required: true },
    token: { type: String, required: true },
  },
  { collection: 'userForgotPwdTokens' },
)

const userForgotPwdModel: Model<IUserToken> = model('userForgotPwdTokensModel', schema)

export default userForgotPwdModel
