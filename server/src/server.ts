import cookieParser from 'cookie-parser'
import express from 'express'
import { IBaseRoutes } from '@/core/interfaces/Auth'
import mongoose, { ConnectOptions } from 'mongoose'
import cors from 'cors'
import multer from 'multer'
import env from './core/config/env'

interface IOptions {
  port: number
  apiPrefix: string
}
export default class Server {
  private readonly app = express()
  private readonly port: number
  private readonly apiPrefix: string
  private readonly formDataParser = multer()

  constructor(
    options: IOptions,
    private BaseRouter: IBaseRoutes,
  ) {
    this.port = options.port
    this.apiPrefix = options.apiPrefix
  }

  async start(): Promise<void> {
    this.app.use(express.json())
    this.app.use(cookieParser())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(cors({ origin: env.URL.CLIENT, credentials: true }))
    this.app.use(this.formDataParser.none())

    this.app.use(this.apiPrefix, this.BaseRouter.router)

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${env.URL.SERVER}`)
    })
  }

  async mongodbConnect(): Promise<void> {
    try {
      const clientOptions: ConnectOptions = {
        serverApi: { version: '1', strict: true, deprecationErrors: true },
      }

      await mongoose.connect(env.mongodb_uri, clientOptions)
      console.log('You successfully connected to MongoDB!')
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}
