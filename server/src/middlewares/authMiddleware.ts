import env from '@/core/config/env'
import TYPES from '@/core/constants/TYPES'
import { IAuthMiddleware, IPasswordResetService } from '@/core/interfaces/IAuth'
import { IAuthToken } from '@/core/interfaces/utility.interface'
import { NextFunction, Request, Response } from 'express'
import { inject, injectable } from 'inversify'

@injectable()
export default class AuthMiddleware implements IAuthMiddleware {
  constructor(
    @inject(TYPES.AuthToken) private AuthToken: IAuthToken,
    @inject(TYPES.PasswordResetService) private PasswordResetService: IPasswordResetService,
  ) {}

  authenticateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { accessToken } = req.cookies

    const decodeAccessToken = await this.AuthToken.verify(accessToken, env.ACCESS_TOKEN.secret)

    // access token  valid
    if (decodeAccessToken) {
      res.locals.userID = decodeAccessToken._id
      next()
      return
    }
    //if (access token) invalid
    res.status(403).end()
  }

  resetPasswordTokenValidate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { forgotPwdToken } = req.cookies
    res.clearCookie('forgotPwdToken')

    if (!forgotPwdToken) {
      res.status(404).send({ success: false, message: 'Reset password link not valid' })
      return
    }

    const { success, status, message, user } = await this.PasswordResetService.verifyToken(forgotPwdToken)

    if (!success) {
      res.status(status).send({ success, message })
      return
    }

    res.locals.userId = user
    next()
  }
}
