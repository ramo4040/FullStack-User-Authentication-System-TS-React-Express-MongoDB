import env from '@/core/config/env'
import TYPES from '@/core/constants/TYPES'
import { IStatusMessage, ITokenManagementService, ITokens } from '@/core/interfaces/IAuth'
import { ITokenRepo, IUser, IUserToken } from '@/core/interfaces/IUser'
import { IAuthToken } from '@/core/interfaces/IUtils'
import { inject, injectable } from 'inversify'

@injectable()
export default class TokenManagementService implements ITokenManagementService {
  /**
   * @param AuthToken responsible for generating and verifying tokens.
   * @param RefreshTokenRepo An instance of the ITokenRepo interface, responsible for managing refresh tokens.
   */
  constructor(
    @inject(TYPES.AuthToken) private AuthToken: IAuthToken,
    @inject(TYPES.RefreshTokenRepo) private RefreshTokenRepo: ITokenRepo<IUserToken>,
  ) {}

  /**
   * Generates login tokens (access and refresh) for a given user.
   *
   * @param user The user object
   * @returns A Promise resolving to an object containing the access and refresh tokens.
   */
  async generateLoginTokens(user: IUser): Promise<ITokens> {
    const accessToken = await this.AuthToken.generateAccessToken(user)
    const refreshToken = await this.AuthToken.generateRefreshToken(user)
    // save refresb token
    await this.RefreshTokenRepo.findByUserId(user?.id, refreshToken)

    return {
      accessToken,
      refreshToken,
    }
  }

  /**
   * Handles refresh token requests.
   *
   * @param token The refresh token provided by the client.
   * @returns return promise object IStatusMessage.
   */
  async handleRefreshToken(token: string): Promise<IStatusMessage> {
    const refreshToken = await this.AuthToken.verify(token, env.REFRESH_TOKEN.secret)

    if (!refreshToken) {
      return {
        status: 401,
        success: false,
      }
    }

    const newRefreshToken = await this.AuthToken.generateRefreshToken(refreshToken)
    const isRefreshTokenValid = await this.RefreshTokenRepo.findByUserId(refreshToken.userId, newRefreshToken)

    // check if refresh token exist
    if (isRefreshTokenValid) {
      // Generate a new access
      const newAccessToken = await this.AuthToken.generateAccessToken(refreshToken)

      return {
        success: true,
        status: 200,
        refreshToken: newRefreshToken,
        accessToken: newAccessToken,
      }
    }

    // if (refresh - access) tokens not valid
    return {
      status: 401,
      success: false,
    }
  }
}
