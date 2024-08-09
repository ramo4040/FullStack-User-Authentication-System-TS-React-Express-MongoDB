import { inject, injectable } from 'inversify'
import { CookieOptions, Request, Response } from 'express'
import TYPES from '@/core/constants/TYPES'
import { IAuthController, IAuthService } from '@/core/interfaces/IAuth'

@injectable()
export default class AuthController implements IAuthController {
  private readonly options: CookieOptions = {
    httpOnly: true,
    domain: 'localhost',
    // secure: true, // https
    sameSite: 'strict',
  }

  /**
   * @param AuthService the service responsible for handling user registration and login logic.
   */
  constructor(@inject(TYPES.AuthService) private AuthService: IAuthService) {}

  /**
   * Handles {POST} requests '/token/validate' endpoint. to validate user token
   * Handles {POST} requests '/auth/register' endpoint.
   * Handles {POST} requests '/auth/login' endpoint.
   * Handles {GET} requests '/auth/logout' endpoint.
   * Handles {GET} requests '/auth/verify-email' endpoint.
   * @param req The Express request object
   * @param res The Express response object
   */

  register = async (req: Request, res: Response): Promise<void> => {
    const result = await this.AuthService.register(req.body)
    res.status(result.status).send(result)
  }

  login = async (req: Request, res: Response): Promise<void> => {
    const result = await this.AuthService.login(req.body)
    // add token in cookie
    if (result.success) {
      res.cookie('accessToken', result.accessToken, { ...this.options, path: '/', maxAge: 15 * 60 * 1000 })
      res.cookie('refreshToken', result.refreshToken, {
        ...this.options,
        path: '/api/v1/auth/token/refresh',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { accessToken, refreshToken, ...withoutTokens } = result
    res.status(result.status).send(withoutTokens)
  }

  logout = async (req: Request, res: Response): Promise<void> => {
    const userID = res.locals.userID

    const { success, status, message } = await this.AuthService.logout(userID)

    if (success) {
      res.clearCookie('accessToken')
      res.clearCookie('refreshToken', { path: '/api/v1/auth/token/refresh' })
    }

    res.status(status).send({ message: message })
  }

  verifyEmail = async (req: Request, res: Response): Promise<void> => {
    // check if token is valid and user exist
    const { success, status, message, accessToken, refreshToken } = await this.AuthService.verifyEmail(
      req.query.token as string,
    )

    if (success) {
      res.cookie('accessToken', accessToken, { ...this.options, path: '/', maxAge: 15 * 60 * 1000 })
      res.cookie('refreshToken', refreshToken, {
        ...this.options,
        path: '/api/v1/auth/token/refresh',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
    }

    res.status(status).send({ message: message, success: success })
  }

  refreshToken = async (req: Request, res: Response): Promise<void> => {
    const { status, success, refreshToken, accessToken } = await this.AuthService.handleRefreshToken(
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

    res.status(status).end()
  }
}
