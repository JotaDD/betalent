import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

export default class BadRequestException extends Exception {
  static status = 400
  static code = 'E_BAD_REQUEST'

  constructor(message: string) {
    super(message, { status: BadRequestException.status, code: BadRequestException.code })
  }

  async handle(error: this, { response }: HttpContext) {
    return response.status(error.status).json({ message: error.message })
  }
}
