import { type NextFunction, type Request, type Response } from 'express'

export interface IAuthMiddleware {
  authenticateUser(req: Request, res: Response, next: NextFunction): Promise<void>
}
