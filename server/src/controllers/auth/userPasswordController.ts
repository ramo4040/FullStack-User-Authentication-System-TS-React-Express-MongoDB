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
    const { forgotPwdToken } = req.cookies

    res.clearCookie('forgotPwdToken')

    if (!forgotPwdToken) {
      res.status(404).send({ success: false, message: 'Reset password link not valid' })
      return
    }

    const { success, status, message, user } = await this.PasswordResetService.verifyToken(forgotPwdToken)

    if (success) {
      const updateUser = await this.PasswordResetService.updatePassword(user as string, req.body.password)

      if (updateUser) {
        res.status(status).send({ success, status, message })
        return
      }
    }

    res.status(status).send({ message })
  }
}
