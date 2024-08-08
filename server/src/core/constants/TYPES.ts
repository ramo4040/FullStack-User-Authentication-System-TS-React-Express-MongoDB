const TYPES = {
  // Routes
  BaseRoutes: Symbol.for('BaseRoutes'),
  AuthRoutes: Symbol.for('AuthRoutes'),
  UserRoutes: Symbol.for('UserRoutes'),

  //auth
  AuthController: Symbol.for('AuthController'),
  AuthService: Symbol.for('AuthService'),
  AuthMiddleware: Symbol.for('AuthMiddleware'),

  //user
  UserRepository: Symbol.for('UserRepository'),
  RefreshTokenRepo: Symbol.for('RefreshTokenRepo'),
  UserController: Symbol.for('UserController'),

  //Utils
  PasswordHasher: Symbol.for('PasswordHasher'),
  AuthToken: Symbol.for('AuthToken'),
  NodeMailer: Symbol.for('NodeMailer'),

  //Validator
  AuthValidator: Symbol.for('AuthValidator'),
}

export default TYPES
