import TYPES from '@/core/constants/TYPES'
import { IPasswordResetService, IUserPasswordController } from '@/core/interfaces/IAuth'
import { CookieOptions, Request, Response } from 'express'
import { inject, injectable } from 'inversify'

@injectable()
export default class UserPasswordController implements IUserPasswordController {
  private readonly options: CookieOptions = {
    httpOnly: true,
    sameSite: 'strict',
    domain: 'localhost',
    path: '/',
    maxAge: 15 * 60 * 1000,
  }

  constructor(@inject(TYPES.PasswordResetService) private PasswordResetService: IPasswordResetService) {}

  forgotPassword = async (req: Request, res: Response): Promise<void> => {
    const email = req.body.email

    const { success, status, message, forgotPwdToken } = await this.PasswordResetService.sendPwdForgotToken(email)

    if (success) {
      res.cookie('forgotPwdToken', forgotPwdToken, this.options)
    }

    res.status(status).send({ message, success })
  }

  passwordReset = async (req: Request, res: Response): Promise<void> => {
    const { userId } = res.locals

    const { status, message, success } = await this.PasswordResetService.updatePassword(
      userId as string,
      req.body.password,
    )

    res.status(status).send({ message, success })
  }
}
