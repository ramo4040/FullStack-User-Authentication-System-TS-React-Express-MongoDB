import TYPES from '@/core/constants/TYPES'
import { IGoogleAuthController, IGoogleAuthService } from '@/core/interfaces/Auth'
import { CookieOptions, Request, Response } from 'express'
import { inject, injectable } from 'inversify'

@injectable()
export default class GoogleAuthController implements IGoogleAuthController {
  private readonly options: CookieOptions = {
    httpOnly: true,
    domain: 'localhost',
    // secure: true, // https
    sameSite: 'strict',
  }

  constructor(@inject(TYPES.GoogleAuthService) private GoogleAuthService: IGoogleAuthService) {}

  authenticate = async (req: Request, res: Response): Promise<void> => {
    const url = this.GoogleAuthService.authenticate()
    res.redirect(url)
  }

  callback = async (req: Request, res: Response): Promise<void> => {
    const code = req.query.code as string
    if (code) {
      const result = await this.GoogleAuthService.callback(code)
      if (result?.success) {
        res.cookie('accessToken', result.accessToken, { ...this.options, path: '/', maxAge: 15 * 60 * 1000 })
        res.cookie('__l', 1, { ...this.options, path: '/', httpOnly: false })
        res.cookie('refreshToken', result.refreshToken, {
          ...this.options,
          path: '/api/v1/auth/token/refresh',
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
      }
      res.redirect('http://localhost:5173/dashboard')
    }
  }
}
