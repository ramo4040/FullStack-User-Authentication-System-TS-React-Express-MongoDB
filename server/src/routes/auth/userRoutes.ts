import TYPES from '@/core/constants/TYPES'
import { IAuthMiddleware, IRoutes, IUserAuthController } from '@/core/interfaces/IAuth'
import { Router } from 'express'
import { inject, injectable } from 'inversify'

@injectable()
export default class UserRoutes implements IRoutes {
  public readonly router: Router

  constructor(
    @inject(TYPES.AuthMiddleware) private AuthMiddleware: IAuthMiddleware,
    @inject(TYPES.UserAuthController) private UserAuthController: IUserAuthController,
  ) {
    this.router = Router()
    this.registerRoutes()
  }

  registerRoutes(): void {
    this.router.get('/me', this.AuthMiddleware.authenticateUser, this.UserAuthController.findOne)
  }
}
