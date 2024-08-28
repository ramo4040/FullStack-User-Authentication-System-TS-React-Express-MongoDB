import env from '@/core/config/env'
import TYPES from '@/core/constants/TYPES'
import { IAuthMiddleware, IAuthToken } from '@/core/interfaces/Auth'
import { NextFunction, Request, Response } from 'express'
import { inject, injectable } from 'inversify'

@injectable()
export default class AuthMiddleware implements IAuthMiddleware {
  constructor(@inject(TYPES.AuthToken) private AuthToken: IAuthToken) {}

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
}
