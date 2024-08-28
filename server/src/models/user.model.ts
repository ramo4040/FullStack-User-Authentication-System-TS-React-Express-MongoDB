import { IUser } from '@/core/interfaces/Auth'
import { Schema, model, Model } from 'mongoose'

const userSchema = new Schema<IUser>(
  {
    googleId: { type: String, unique: true, default: null },

    username: { type: String, unique: true, index: true, required: true },

    email: { type: String, unique: true, index: true, required: true },

    verificationToken: {
      type: String,
      default: undefined,
    },

    isEmailVerified: { type: Boolean, default: false },

    password: { type: String, required: false, default: null },
  },
  { collection: 'Users' },
)

export const UserModel: Model<IUser> = model('Users', userSchema)
