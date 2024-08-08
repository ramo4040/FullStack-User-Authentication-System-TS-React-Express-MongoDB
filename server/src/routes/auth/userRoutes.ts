import TYPES from '@/core/constants/TYPES'
import { IAuthMiddleware, IRoutes } from '@/core/interfaces/IAuth'
import { IUserController } from '@/core/interfaces/IUser'
import { Router } from 'express'
import { inject, injectable } from 'inversify'

@injectable()
export default class UserRoutes implements IRoutes {
  public readonly router: Router

  constructor(
    @inject(TYPES.AuthMiddleware) private AuthMiddleware: IAuthMiddleware,
    @inject(TYPES.UserController) private UserController: IUserController,
  ) {
    this.router = Router()
    this.registerRoutes()
  }

  registerRoutes(): void {
    this.router.get('/me', this.AuthMiddleware.authenticateUser, this.UserController.findOne)
  }
}
