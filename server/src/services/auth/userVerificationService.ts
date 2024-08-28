import env from '@/core/config/env'
import TYPES from '@/core/constants/TYPES'
import {
  IAuthToken,
  IUser,
  IUserRepository,
  IStatusMessage,
  ITokenManagementService,
  IUserVerificationService,
} from '@/core/interfaces/Auth'
import { inject, injectable } from 'inversify'

@injectable()
export default class UserVerificationService implements IUserVerificationService {
  /**
   * @param UserRepository abstraction layer to store data
   * @param AuthToken Class provide jwt functionalities
   * @param RefreshTokenRepo abstraction layer to manage RefreshToken data
   */
  constructor(
    @inject(TYPES.UserRepository) private UserRepository: IUserRepository<IUser>,
    @inject(TYPES.AuthToken) private AuthToken: IAuthToken,
    @inject(TYPES.TokenManagementService) private TokenManagementService: ITokenManagementService,
  ) {}

  async verifyEmailToken(verifyToken: string, oldAccessToken: string | null): Promise<Partial<IStatusMessage | void>> {
    const decodeVerifyToken = await this.AuthToken.verify(verifyToken, env.EMAIL.secret)

    if (!decodeVerifyToken) return

    const user = await this.UserRepository.update(
      { verificationToken: verifyToken },
      {
        $set: { isEmailVerified: true },
        $unset: { verificationToken: '' },
      },
      { new: true },
    )

    if (!user || oldAccessToken) return

    const { accessToken, refreshToken } = await this.TokenManagementService.generateLoginTokens(user)
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    }
  }
}
