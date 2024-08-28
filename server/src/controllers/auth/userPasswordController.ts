import env from '@/core/config/env'
import TYPES from '@/core/constants/TYPES'
import { IAuthToken, IPasswordResetService, IUserPasswordController } from '@/core/interfaces/Auth'
import { Request, Response } from 'express'
import { inject, injectable } from 'inversify'

@injectable()
export default class UserPasswordController implements IUserPasswordController {
  constructor(
    @inject(TYPES.PasswordResetService) private PasswordResetService: IPasswordResetService,
    @inject(TYPES.AuthToken) private AuthToken: IAuthToken,
  ) {}

  forgotPassword = async (req: Request, res: Response): Promise<void> => {
    const email = req.body.email
    const { success, status, message } = await this.PasswordResetService.sendPwdForgotToken(email)
    res.status(status).send({ success, status, message })
  }

  validateToken = async (req: Request, res: Response): Promise<void> => {
    const token = req.query.token as string
    const isValid = await this.AuthToken.verify(token, env.EMAIL.secret)

    if (!isValid) {
      res.status(404).send({ success: false, message: 'Reset password link not valid' })
      return
    }

    res.send(200).end()
  }

  passwordReset = async (req: Request, res: Response): Promise<void> => {
    const token = req.query.token as string

    const { success, status, message, user } = await this.PasswordResetService.verifyToken(token)

    if (success) {
      const { status, message, success } = await this.PasswordResetService.updatePassword(
        user as string,
        req.body.password,
      )
      res.status(status).send({ status, message, success })
      return
    }

    res.status(status).send({ status, success, message })
    return
  }
}
