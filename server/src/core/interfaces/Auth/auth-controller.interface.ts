import { type Request, type Response } from 'express'

type AuthRequestHandler = (req: Request, res: Response) => Promise<void>

export interface IUserAuthController {
  register: AuthRequestHandler
  login: AuthRequestHandler
  logout: AuthRequestHandler
  findOne: AuthRequestHandler
}

export interface IUserPasswordController {
  forgotPassword: AuthRequestHandler
  validateToken: AuthRequestHandler
  passwordReset: AuthRequestHandler
}

export interface IGoogleAuthController {
  authenticate: AuthRequestHandler
  callback: AuthRequestHandler
}
