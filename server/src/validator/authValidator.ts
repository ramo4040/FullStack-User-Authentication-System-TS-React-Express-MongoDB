import { IAuthValidator } from '@/core/interfaces/IValidator'
import { Request, NextFunction, Response } from 'express'
import { injectable } from 'inversify'
import Joi from 'joi'

@injectable()
export default class AuthValidator implements IAuthValidator {
  // schema for login requests
  private readonly loginSchema = Joi.object({
    email: Joi.string().required().email().messages({ 'string.email': 'please enter a valid address email' }),
    password: Joi.string().required(),
  })

  // schema for register requests
  private readonly registerSchema = Joi.object({
    username: Joi.string().required().min(3).max(40).alphanum().messages({
      'string.min': 'Username must be at least 3 characters long.',
      'string.max': 'Username must be at most 40 characters long.',
      'string.alphanum': 'Username can only contain alphanumeric characters.',
    }),
    email: Joi.string()
      .required()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net', 'org', 'edu'] },
      })
      .messages({
        'string.email': 'Please enter a valid email address.',
      }),
    password: Joi.string()
      .required()
      .min(8)
      .regex(/^^(?=.*[A-Z])(?=.*[\W_]).{8,}$/)
      .messages({
        'string.min': 'Password must be at least 8 characters long.',
        'string.pattern.base':
          'Password must contain at least one lowercase letter, uppercase letter, digit, and special character.',
      }),
    confirmPassword: Joi.string()
      .required()
      .valid(Joi.ref('password')) // matches the password
      .messages({
        'any.only': 'Confirm password must match the password.',
      }),
  })

  // schema for forgot-password requests
  private readonly forgotPassword = Joi.object({
    email: Joi.string().required().email().messages({ 'string.email': 'please enter a valid address email' }),
  })

  // schema for reset-password requests
  private readonly resetPassword = Joi.object({
    password: Joi.string()
      .required()
      .min(8)
      .regex(/^^(?=.*[A-Z])(?=.*[\W_]).{8,}$/)
      .messages({
        'string.min': 'Password must be at least 8 characters long.',
        'string.pattern.base':
          'Password must contain at least one lowercase letter, uppercase letter, digit, and special character.',
      }),
    confirmPassword: Joi.string()
      .required()
      .valid(Joi.ref('password')) // matches the password
      .messages({
        'any.only': 'Confirm password must match the password.',
      }),
  })

  // Map to associate paths with their corresponding schemas
  private readonly schemaMap: { [key: string]: Joi.ObjectSchema } = {
    '/login': this.loginSchema,
    '/register': this.registerSchema,
    '/forgot-password': this.forgotPassword,
    '/reset-password': this.resetPassword,
  }

  // Middleware functions to validate login and regiser requests
  validate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const schema = this.schemaMap[req.path]

    if (schema) {
      try {
        await schema.validateAsync(req.body)
        next()
      } catch (error: any) {
        res.status(422).send({ status: false, message: error?.details[0]?.message })
      }
    }
  }
}
