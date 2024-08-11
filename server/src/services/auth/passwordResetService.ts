import TYPES from '@/core/constants/TYPES'
import { IPasswordResetService, IStatusMessage } from '@/core/interfaces/IAuth'
import { IUser, IUserRepository } from '@/core/interfaces/IUser'
import { IAuthToken, INodeMailer } from '@/core/interfaces/IUtils'
import { inject, injectable } from 'inversify'

@injectable()
export default class PasswordResetService implements IPasswordResetService {
  constructor(
    @inject(TYPES.UserRepository) private UserRepository: IUserRepository<IUser>,
    @inject(TYPES.AuthToken) private AuthToken: IAuthToken,
    @inject(TYPES.NodeMailer) private NodeMailer: INodeMailer,
  ) {}

  async sendPwdForgotToken(email: string): Promise<IStatusMessage> {
    const isEmailValid = await this.UserRepository.findOne({ email: email })

    if (isEmailValid) {
      const token = await this.AuthToken.generateEmailToken(isEmailValid.id)
      await this.NodeMailer.sendForgotPwdEmail(email, token)

      return {
        success: true,
        status: 200,
        message: 'Please check your email',
      }
    }
    return {
      success: false,
      status: 404,
      message: 'User email not found ',
    }
  }
}
