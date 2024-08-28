import env from '@/core/config/env'
import TYPES from '@/core/constants/TYPES'
import {
  IAuthToken,
  INodeMailer,
  IPasswordHasher,
  ITokenRepo,
  IUser,
  IUserRepository,
  IUserToken,
  IPasswordResetService,
  IStatusMessage,
} from '@/core/interfaces/Auth'
import { inject, injectable } from 'inversify'
import { ObjectId } from 'mongoose'

@injectable()
export default class PasswordResetService implements IPasswordResetService {
  constructor(
    @inject(TYPES.UserRepository) private UserRepository: IUserRepository<IUser>,
    @inject(TYPES.ForgotPwdRepo) private ForgotPwdRepo: ITokenRepo<IUserToken>,
    @inject(TYPES.PasswordHasher) private PasswordHasher: IPasswordHasher,
    @inject(TYPES.AuthToken) private AuthToken: IAuthToken,
    @inject(TYPES.NodeMailer) private NodeMailer: INodeMailer,
  ) {}

  async sendPwdForgotToken(email: string): Promise<IStatusMessage> {
    const isEmailValid = await this.UserRepository.findOne({ email: email })

    if (isEmailValid) {
      const token = await this.AuthToken.generateEmailToken(isEmailValid.id)

      try {
        await this.NodeMailer.sendForgotPwdEmail(email, token)
        await this.ForgotPwdRepo.create(isEmailValid._id as ObjectId, token)

        return {
          success: true,
          status: 200,
          message: 'Please check your email',
        }
      } catch (error) {
        return {
          success: false,
          status: 500,
          message: 'An error ocured .',
        }
      }
    }
    return {
      success: false,
      status: 404,
      message: 'User email not found ',
    }
  }

  async verifyToken(token: string): Promise<IStatusMessage> {
    const decodeToken = await this.AuthToken.verify(token, env.EMAIL.secret)

    if (!decodeToken) {
      return {
        success: false,
        status: 404,
        message: 'Reset password link not valid',
      }
    }

    const isValid = await this.ForgotPwdRepo.deleteByUserId(decodeToken._id)

    if (!isValid) {
      return {
        success: false,
        status: 400,
        message: 'Reset password link not valid',
      }
    }

    return {
      success: true,
      status: 200,
      user: decodeToken._id as Partial<IUser>,
    }
  }

  async updatePassword(userId: string, newPwd: string): Promise<IStatusMessage> {
    const newHashPwd = await this.PasswordHasher.hashPassword(newPwd)

    const updateUser = await this.UserRepository.update(
      { _id: userId },
      { $set: { password: newHashPwd } },
      { new: true },
    )

    if (updateUser) {
      return {
        message: 'Your password has been reset successfully! You can now log in with your new password.',
        success: true,
        status: 200,
      }
    }

    return {
      message: 'Internal Server Error',
      success: false,
      status: 500,
    }
  }
}
