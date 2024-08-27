import TYPES from '@/core/constants/TYPES'
import {
  IAuthMiddleware,
  IGoogleAuthController,
  IRoutes,
  IUserAccountController,
  IUserAuthController,
  IUserPasswordController,
} from '@/core/interfaces/IAuth'
import { IAuthValidator } from '@/core/interfaces/IValidator'
import { Router } from 'express'
import { inject, injectable } from 'inversify'

@injectable()
export default class AuthRoutes implements IRoutes {
  public readonly router: Router

  constructor(
    @inject(TYPES.UserAuthController) private UserAuthController: IUserAuthController,
    @inject(TYPES.UserAccountController) private UserAccountController: IUserAccountController,
    @inject(TYPES.UserPasswordController) private UserPasswordController: IUserPasswordController,
    @inject(TYPES.GoogleAuthController) private GoogleAuthController: IGoogleAuthController,
    @inject(TYPES.AuthValidator) private AuthValidator: IAuthValidator,
    @inject(TYPES.AuthMiddleware) private AuthMiddleware: IAuthMiddleware,
  ) {
    this.router = Router()
    this.registerRoutes()
  }

  registerRoutes(): void {
    // user Authentication routes
    this.router.post('/register', this.AuthValidator.validate, this.UserAuthController.register)
    this.router.post('/login', this.AuthValidator.validate, this.UserAuthController.login)
    this.router.get('/logout', this.AuthMiddleware.authenticateUser, this.UserAuthController.logout)

    //google authentication
    this.router.get('/google/authenticate', this.GoogleAuthController.authenticate)
    this.router.get('/google/callback', this.GoogleAuthController.callback)

    this.router.get('/verify-email', this.UserAccountController.verifyEmail)
    this.router.post('/token/refresh', this.UserAccountController.refreshToken)

    this.router.post('/forgot-password', this.AuthValidator.validate, this.UserPasswordController.forgotPassword)
    this.router.patch('/reset-password', this.AuthValidator.validate, this.UserPasswordController.passwordReset)
  }
}
