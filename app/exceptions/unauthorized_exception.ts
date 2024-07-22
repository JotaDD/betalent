import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

export default class UnauthorizedException extends Exception {
  static status = 401
  static code = 'E_UNAUTHORIZED'

  constructor() {
    super('', { status: UnauthorizedException.status, code: UnauthorizedException.code })
  }
  async handle(error: this, { response }: HttpContext) {
    return response.status(error.status).json({ message: 'Invalid credentials' })
  }
}
