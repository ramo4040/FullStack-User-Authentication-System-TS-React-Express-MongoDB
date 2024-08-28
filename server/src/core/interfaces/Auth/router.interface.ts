import { type Router } from 'express'

export interface IRoutes {
  router: Router
  registerRoutes(): void
}

export interface IBaseRoutes {
  router: Router
  registerRoutes(): void
}
