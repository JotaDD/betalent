import User from '#models/user'
import hash from '@adonisjs/core/services/hash'
import jwt from 'jsonwebtoken'

export default class AuthService {
  async generateToken(email: string) {
    const token = jwt.sign(
      {
        email: email,
      },
      process.env.APP_KEY as string,
      {
        expiresIn: '1d',
      }
    )
    return token
  }

  async verifyToken(token: string) {
    try {
      const verified = jwt.verify(token, process.env.APP_KEY as string)
      return verified
    } catch (error) {
      return null
    }
  }

  async validatePassword(email: string, password: string): Promise<boolean> {
    try {
      const user = await User.findByOrFail('email', email)
      const isValid = await hash.verify(user.password, password)
      return isValid
    } catch (error) {
      return false
    }
  }
}
