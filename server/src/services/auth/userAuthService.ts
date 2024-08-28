import TYPES from '@/core/constants/TYPES'
import {
  IAuthToken,
  INodeMailer,
  IPasswordHasher,
  ITokenRepo,
  IUser,
  IUserToken,
  IUserRepository,
  IRegistrationData,
  IStatusMessage,
  ITokenManagementService,
  IUserAuthService,
} from '@/core/interfaces/Auth'
import { inject, injectable } from 'inversify'
import { ObjectId } from 'mongoose'

@injectable()
export default class UserAuthService implements IUserAuthService {
  /**
   * @param PasswordHasher class responsible for password hashing and comparison
   * @param UserRepository abstraction layer to store data
   * @param AuthToken Class provide jwt functionalities
   * @param RefreshTokenRepo abstraction layer to manage RefreshToken data
   * @param NodeMailer class to send mails
   * @param TokenManagementService class generate access and refresh token
   */
  constructor(
    @inject(TYPES.PasswordHasher) private PasswordHasher: IPasswordHasher,
    @inject(TYPES.UserRepository) private UserRepository: IUserRepository<IUser>,
    @inject(TYPES.AuthToken) private AuthToken: IAuthToken,
    @inject(TYPES.RefreshTokenRepo) private RefreshTokenRepo: ITokenRepo<IUserToken>,
    @inject(TYPES.NodeMailer) private NodeMailer: INodeMailer,
    @inject(TYPES.TokenManagementService) private TokenManagementService: ITokenManagementService,
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
      data.password = await this.PasswordHasher.hashPassword(data.password as string)
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
        const isPasswordValid = await this.PasswordHasher.comparePassword(data.password as string, user.password)
        if (isPasswordValid) {
          //generate tokens
          const { accessToken, refreshToken } = await this.TokenManagementService.generateLoginTokens(user)

          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { password, verificationToken, ...withoutPassword } = user.toObject()

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

  /**
   *
   * @param userID from access token payload
   * @returns return promise object IStatusMessage.
   */
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
   * @param id user id from access token payload
   * @returns return user object .
   */
  async findOne(id: ObjectId): Promise<IUser | null> {
    const user = await this.UserRepository.findOne({ _id: id })
    if (user) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, verificationToken, ...withoutPassword } = user.toObject()
      return withoutPassword
    }
    return null
  }
}
