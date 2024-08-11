import env from '@/core/config/env'
import TYPES from '@/core/constants/TYPES'
import { IAuthService, IRegistrationData, IStatusMessage } from '@/core/interfaces/IAuth'
import { IRefreshTokenRepo, IUser, IUserRefreshToken, IUserRepository } from '@/core/interfaces/IUser'
import { IAuthToken, INodeMailer, IPasswordHasher } from '@/core/interfaces/IUtils'
import { inject, injectable } from 'inversify'

@injectable()
export default class AuthService implements IAuthService {
  /**
   * @param PasswordHasher class responsible for password hashing and comparison
   * @param UserRepository abstraction layer to store data
   * @param AuthToken Class provide jwt functionalities
   * @param RefreshTokenRepo abstraction layer to manage RefreshToken data
   */
  constructor(
    @inject(TYPES.PasswordHasher) private PasswordHasher: IPasswordHasher,
    @inject(TYPES.UserRepository)
    private UserRepository: IUserRepository<IUser>,
    @inject(TYPES.AuthToken) private AuthToken: IAuthToken,
    @inject(TYPES.RefreshTokenRepo) private RefreshTokenRepo: IRefreshTokenRepo<IUserRefreshToken>,
    @inject(TYPES.NodeMailer) private NodeMailer: INodeMailer,
  ) {}

  /**
   * Registers a new user.
   * @param data - object containing the users information
   * @returns return promise object IStatusMessage.
   * @throws error if the username or email already exists, or if there is a problem saving the user
   */
  async register(data: IRegistrationData): Promise<IStatusMessage> {
    try {
      // hash password
      data.password = await this.PasswordHasher.hashPassword(data.password)
      // create user model
      const user = await this.UserRepository.createUserModel(data)
      // create verification token
      user.verificationToken = await this.AuthToken.generateEmailToken(user.id)
      // create user in database
      await this.UserRepository.saveUser(user)
      // send email verification
      this.NodeMailer.sendVerificationEmail(user.email, user.verificationToken as string)

      // return promise object
      return {
        success: true,
        status: 201,
        message: 'Registration successful!',
      }
    } catch (error: any) {
      return await this.handleRegistrationError(error)
    }
  }

  /**
   * Handles errors that occur during user registration.
   * @param error - error object
   * @returns promise object IStatusMessageIStatusMessage
   */
  private async handleRegistrationError(error: any): Promise<IStatusMessage> {
    // Handle username or email exist!
    if (error.keyPattern?.username) {
      return { success: false, status: 409, user: null, message: 'Username already exists' }
    } else if (error.keyPattern?.email) {
      return { success: false, status: 409, user: null, message: 'Email already exists' }
    }
    // Return a generic error message if there is a problem saving the user
    return {
      success: false,
      status: 500,
      user: null,
      message: 'An error occurred during registration',
    }
  }

  /**
   *
   * @param data object containing the users information
   * @returns return promise object IStatusMessage.
   */
  async login(data: IRegistrationData): Promise<IStatusMessage> {
    const user = await this.UserRepository.findOne({ email: data.email })
    try {
      // if user exist
      if (user) {
        //validate password
        const isPasswordValid = await this.PasswordHasher.comparePassword(data.password, user.password)
        if (isPasswordValid) {
          //generate token
          const accessToken = await this.AuthToken.generateAccessToken(user)
          const refreshToken = await this.AuthToken.generateRefreshToken(user)
          // save refresb token
          await this.RefreshTokenRepo.create(user._id, refreshToken)
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { password, ...withoutPassword } = user.toObject()
          //send response message
          return {
            success: true,
            status: 200,
            accessToken: accessToken,
            refreshToken: refreshToken,
            user: withoutPassword,
            message: 'You have successfully logged in.',
          }
        }
      }

      //if email or passwrod incorrect
      return {
        success: false,
        status: 404,
        user: null,
        message: 'Username or Password incorrect.',
      }
    } catch (error) {
      //internal server error
      return {
        success: false,
        status: 500,
        user: null,
        message: 'An error occurred during authentication.',
      }
    }
  }

  async logout(userID: string): Promise<IStatusMessage> {
    const result = await this.RefreshTokenRepo.deleteByUserId(userID)

    if (result) {
      return {
        success: true,
        status: 200,
        message: 'You have successfully logged out!',
      }
    }

    return {
      success: false,
      status: 404,
      message: 'Error',
    }
  }

  /**
   *
   * @param verifyToken token generated when user register
   * @returns return promise object IStatusMessage.
   */
  async verifyEmail(verifyToken: string, oldAccessToken: string | null): Promise<Partial<IStatusMessage | void>> {
    const decodeVerifyToken = await this.AuthToken.verify(verifyToken, env.EMAIL.secret)

    if (!decodeVerifyToken) return

    const user = await this.UserRepository.update(
      { verificationToken: verifyToken },
      {
        $set: { isEmailVerified: true },
        $unset: { verificationToken: '' },
      },
    )

    if (!user || oldAccessToken) return

    const accessToken = await this.AuthToken.generateAccessToken(user as IUser)
    const refreshToken = await this.AuthToken.generateRefreshToken(user as IUser)

    await this.RefreshTokenRepo.findByUserId(user?.id, refreshToken)

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    }
  }

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

  async sendPwdForgotToken(email: string): Promise<IStatusMessage> {
    const isEmailValid = await this.UserRepository.findOne({ email: email })

    if (isEmailValid) {
      const token = await this.AuthToken.generateEmailToken(isEmailValid.id)
      await this.NodeMailer.sendForgotPwdEmail(email, token)

      return {
        success: true,
        status: 200,
        message: 'Please check your email',
      }
    }
    return {
      success: false,
      status: 404,
      message: 'User email not found ',
    }
  }
}
