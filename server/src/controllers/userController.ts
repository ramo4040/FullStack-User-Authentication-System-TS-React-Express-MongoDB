import TYPES from '@/core/constants/TYPES'
import { IUser, IUserController, IUserRepository } from '@/core/interfaces/IUser'
import { Request, Response } from 'express'
import { inject, injectable } from 'inversify'

@injectable()
export default class UserController implements IUserController {
  constructor(@inject(TYPES.UserRepository) private UserRepository: IUserRepository<IUser>) {}

  findOne = async (req: Request, res: Response): Promise<void> => {
    const user = await this.UserRepository.findOne({ _id: res.locals.userID })

    if (user) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...withoutPassword } = user.toObject()
      res.status(200).send(withoutPassword)
    }
  }
}
