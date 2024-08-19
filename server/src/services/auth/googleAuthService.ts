import env from '@/core/config/env'
import TYPES from '@/core/constants/TYPES'
import { IGoogleAuthService, IStatusMessage, ITokenManagementService, ITokens } from '@/core/interfaces/IAuth'
import { IGoogleUserPayload, IUser, IUserRepository } from '@/core/interfaces/IUser'
import { OAuth2Client } from 'google-auth-library'
import { inject, injectable } from 'inversify'

/**
 * GoogleAuthService is responsible for handling Google authentication with Google's OAuth2.0.
 *
 * @constructor
 * @param {IUserRepository<IUser>} UserRepository - The user repository for managing user data.
 * @param {ITokenManagementService} TokenManagementService - The service for managing authentication tokens.
 */

@injectable()
export default class GoogleAuthService implements IGoogleAuthService {
  private oauth2Client: OAuth2Client

  constructor(
    @inject(TYPES.UserRepository) private UserRepository: IUserRepository<IUser>,
    @inject(TYPES.TokenManagementService) private TokenManagementService: ITokenManagementService,
  ) {
    this.oauth2Client = new OAuth2Client({
      clientId: env.GOOGLE.CLIENT_ID,
      clientSecret: env.GOOGLE.CLIENT_SECRET,
      redirectUri: env.GOOGLE.REDIRECT_URI,
    })
  }

  /**
   * Generates the authentication URL for Google OAuth2.0
   * This URL can be used to redirect users to Google login page.
   *
   * @returns {string} The authentication URL.
   */

  authenticate(): string {
    const url = this.oauth2Client.generateAuthUrl({
      scope: ['profile', 'email', 'openid'],
    })
    return url
  }

  /**
   * Exchanges the authorization code for tokens and verifies the ID token.
   *    *
   * @param {string} code - The authorization code received from Google.
   * @returns {Promise<IStatusMessage | void>} A promise that resolves to a status message containing tokens or void.
   */

  async callback(code: string): Promise<IStatusMessage | void> {
    const { tokens } = await this.oauth2Client.getToken(code)

    const idToken = tokens.id_token as string

    const decodeIdToken = await this.oauth2Client.verifyIdToken({
      idToken: idToken,
      audience: env.GOOGLE.CLIENT_ID,
    })

    const payload = decodeIdToken.getPayload() as IGoogleUserPayload

    if (payload) {
      const user = await this.handleUser(payload)

      if (user) {
        const { accessToken, refreshToken } = await this.generateTokens(user)

        return {
          success: true,
          status: 300,
          accessToken,
          refreshToken,
        }
      }
    }
  }

  /**
   * Handles user data based on the payload received from Google.
   *
   * @param {IGoogleUserPayload} payload - The payload containing user information from Google.
   * @returns {Promise<IUser | null>} A promise that resolves to the user object or null if not found.
   */

  private async handleUser(payload: IGoogleUserPayload): Promise<IUser | null> {
    const { email, email_verified: isEmailVerified, sub: googleId, name } = payload

    // Remove spaces from the username
    const username = name.replace(/\s/g, '')

    //if user already authenticate using google
    const user = await this.UserRepository.findOne({ googleId })
    if (user) return user

    //update user data if already register using same email
    //create new user if does not exists
    const updatedUser = await this.UserRepository.update(
      { email },
      {
        $setOnInsert: {
          email,
          username,
        },
        $set: {
          isEmailVerified,
          googleId,
        },
      },
      { upsert: true, new: true },
    )

    if (updatedUser) return updatedUser

    return user
  }

  /**
   * Generates access and refresh tokens for the authenticated user.
   *
   * @param {IUser} user - The user object
   * @returns {Promise<ITokens>} A promise that resolves to the generated tokens.
   */

  private async generateTokens(user: IUser): Promise<ITokens> {
    return await this.TokenManagementService.generateLoginTokens(user)
  }
}
