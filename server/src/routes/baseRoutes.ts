import TYPES from '@/core/constants/TYPES'
import { IRoutes, IBaseRoutes } from '@/core/interfaces/Auth'
import { Router } from 'express'
import { inject, injectable } from 'inversify'

@injectable()
export default class BaseRoutes implements IBaseRoutes {
  public router: Router
  constructor(
    @inject(TYPES.AuthRoutes) private AuthRoutes: IRoutes,
    @inject(TYPES.UserRoutes) private UserRoutes: IRoutes,
  ) {
    this.router = Router()
    this.registerRoutes()
  }

  registerRoutes() {
    this.router.use('/auth', this.AuthRoutes.router) //auth api
    this.router.use(this.UserRoutes.router) // user api
  }
}
