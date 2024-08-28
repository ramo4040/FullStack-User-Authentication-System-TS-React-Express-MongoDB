import { type Request, type Response } from 'express'
type AuthRequestHandler = (req: Request, res: Response) => Promise<void>

export interface IUserAccountController {
  verifyEmail: AuthRequestHandler
  refreshToken: AuthRequestHandler
}
