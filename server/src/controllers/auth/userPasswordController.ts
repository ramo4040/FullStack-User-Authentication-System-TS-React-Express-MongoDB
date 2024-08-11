import TYPES from '@/core/constants/TYPES'
import { IPasswordResetService, IUserPasswordController } from '@/core/interfaces/IAuth'
import { Request, Response } from 'express'
import { inject } from 'inversify'

export default class UserPasswordController implements IUserPasswordController {
  constructor(@inject(TYPES.PasswordResetService) private PasswordResetService: IPasswordResetService) {}

  sendPwdForgotToken = async (req: Request, res: Response): Promise<void> => {
    const email = req.body.email
    const { status, message } = await this.PasswordResetService.sendPwdForgotToken(email)
    res.status(status).send({ message: message })
  }
}
