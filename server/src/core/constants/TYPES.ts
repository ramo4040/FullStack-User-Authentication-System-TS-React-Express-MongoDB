const TYPES = {
  // Routes
  BaseRoutes: Symbol.for('BaseRoutes'),
  AuthRoutes: Symbol.for('AuthRoutes'),
  UserRoutes: Symbol.for('UserRoutes'),

  //user auth Services
  UserAuthService: Symbol.for('UserAuthService'),
  TokenManagementService: Symbol.for('TokenManagementService'),
  UserVerificationService: Symbol.for('UserVerificationService'),
  PasswordResetService: Symbol.for('PasswordResetService'),

  //user auth Controllers
  UserAuthController: Symbol.for('UserAuthController'),
  UserAccountController: Symbol.for('UserAccountController'),
  UserPasswordController: Symbol.for('UserPasswordController'),

  AuthMiddleware: Symbol.for('AuthMiddleware'),

  //user
  UserRepository: Symbol.for('UserRepository'),
  RefreshTokenRepo: Symbol.for('RefreshTokenRepo'),

  //Utils
  PasswordHasher: Symbol.for('PasswordHasher'),
  AuthToken: Symbol.for('AuthToken'),
  NodeMailer: Symbol.for('NodeMailer'),

  //Validator
  AuthValidator: Symbol.for('AuthValidator'),
}

export default TYPES
