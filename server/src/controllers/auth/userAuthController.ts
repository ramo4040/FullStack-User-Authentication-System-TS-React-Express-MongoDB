import TYPES from '@/core/constants/TYPES'
import { IUserAuthController, IUserAuthService } from '@/core/interfaces/Auth'
import { CookieOptions, Request, Response } from 'express'
import { inject, injectable } from 'inversify'

@injectable()
export default class UserAuthController implements IUserAuthController {
  private readonly options: CookieOptions = {
    httpOnly: true,
    domain: 'localhost',
    // secure: true, // https
    sameSite: 'strict',
  }

  constructor(@inject(TYPES.UserAuthService) private UserAuthService: IUserAuthService) {}

  findOne = async (req: Request, res: Response): Promise<void> => {
    const user = await this.UserAuthService.findOne(res.locals.userID)
    if (user) {
      res.status(200).send(user)
      return
    }
    res.status(404).end()
  }

  register = async (req: Request, res: Response): Promise<void> => {
    const result = await this.UserAuthService.register(req.body)
    res.status(result.status).send(result)
  }

  login = async (req: Request, res: Response): Promise<void> => {
    const result = await this.UserAuthService.login(req.body)
    // add token in cookie
    if (result.success) {
      res.cookie('accessToken', result.accessToken, { ...this.options, path: '/', maxAge: 15 * 60 * 1000 })
      res.cookie('__l', 1, { ...this.options, path: '/', httpOnly: false })
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

    const { success, status, message } = await this.UserAuthService.logout(userID)

    if (success) {
      res.clearCookie('accessToken')
      res.clearCookie('__l')
      res.clearCookie('refreshToken', { path: '/api/v1/auth/token/refresh' })
    }

    res.status(status).send({ message: message })
  }
}
