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
  GoogleAuthService: Symbol.for('GoogleAuthService'),

  //user auth Controllers
  UserAuthController: Symbol.for('UserAuthController'),
  UserAccountController: Symbol.for('UserAccountController'),
  UserPasswordController: Symbol.for('UserPasswordController'),
  GoogleAuthController: Symbol.for('GoogleAuthController'),

  AuthMiddleware: Symbol.for('AuthMiddleware'),

  //user
  UserRepository: Symbol.for('UserRepository'),
  RefreshTokenRepo: Symbol.for('RefreshTokenRepo'),
  ForgotPwdRepo: Symbol.for('ForgotPwdRepo'),

  //Utils
  PasswordHasher: Symbol.for('PasswordHasher'),
  AuthToken: Symbol.for('AuthToken'),
  NodeMailer: Symbol.for('NodeMailer'),

  //Validator
  AuthValidator: Symbol.for('AuthValidator'),
}

export default TYPES
