import TYPES from '@/core/constants/TYPES'
import { ITokenManagementService, IUserAccountController, IUserVerificationService } from '@/core/interfaces/Auth'
import { CookieOptions, Request, Response } from 'express'
import { inject, injectable } from 'inversify'

@injectable()
export default class UserAccountController implements IUserAccountController {
  private readonly options: CookieOptions = {
    httpOnly: true,
    domain: 'localhost',
    // secure: true, // https
    sameSite: 'strict',
  }

  constructor(
    @inject(TYPES.UserVerificationService) private UserVerificationService: IUserVerificationService,
    @inject(TYPES.TokenManagementService) private TokenManagementService: ITokenManagementService,
  ) {}

  verifyEmail = async (req: Request, res: Response): Promise<void> => {
    const emailToken = req.query.token as string
    const oldAccessToken = req.cookies.accessToken

    const result = await this.UserVerificationService.verifyEmailToken(emailToken, oldAccessToken)

    if (result?.accessToken && result.refreshToken) {
      res.cookie('accessToken', result.accessToken, { ...this.options, path: '/', maxAge: 15 * 60 * 1000 })
      res.cookie('__l', 1, { ...this.options, path: '/', httpOnly: false })
      res.cookie('refreshToken', result.refreshToken, {
        ...this.options,
        path: '/api/v1/auth/token/refresh',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
    }

    res.cookie('__emailIsVerified', 1, { ...this.options, path: '/', httpOnly: false })
    res.redirect('http://localhost:5173/dashboard')
  }

  refreshToken = async (req: Request, res: Response): Promise<void> => {
    const { status, success, refreshToken, accessToken } = await this.TokenManagementService.handleRefreshToken(
      req.cookies.refreshToken,
    )

    if (success) {
      res.cookie('accessToken', accessToken, { ...this.options, path: '/', maxAge: 15 * 60 * 1000 })
      res.cookie('refreshToken', refreshToken, {
        ...this.options,
        path: '/api/v1/auth/token/refresh',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
    }

    res.status(status).send({ status, success })
  }
}
