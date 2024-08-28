import env from '@/core/config/env'
import { INodeMailer } from '@/core/interfaces/Auth'
import { injectable } from 'inversify'
import nodeMailer from 'nodemailer'

@injectable()
export default class NodeMailer implements INodeMailer {
  private readonly emailTransporter = nodeMailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: env.MAILER.user,
      pass: env.MAILER.pass,
    },
  })

  /**
   * Sends a verification email to the user.
   * @param username - The username of the user.
   * @param email - The email address of the user.
   * @returns Promise<void>
   */
  async sendVerificationEmail(email: string, token: string): Promise<void> {
    const verificationUrl = `http://localhost:3000/api/v1/auth/verify-email?token=${token}`

    const mailoptions = {
      from: env.MAILER.user,
      to: email,
      subject: 'Verify Your Email',
      html: `<a href="${verificationUrl}">Click here</a>`,
    }

    this.sendMail(mailoptions)
  }

  async sendForgotPwdEmail(email: string, token: string): Promise<void> {
    const verificationUrl = `http://localhost:5173/reset-password?token=${token}`

    const mailoptions = {
      from: env.MAILER.user,
      to: email,
      subject: 'Reset your password',
      html: `<a href="${verificationUrl}">Click here</a>`,
    }

    this.sendMail(mailoptions)
  }

  private async sendMail(options: object): Promise<void> {
    await this.emailTransporter.sendMail(options, (error) => {
      if (error) {
        throw error
      }
    })
  }
}
