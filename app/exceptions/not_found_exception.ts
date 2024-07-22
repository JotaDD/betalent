import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

export default class NotFoundException extends Exception {
  static status = 500
  static code = 'E_ROW_NOT_FOUND'

  constructor(message: string) {
    super(message, { status: NotFoundException.status, code: NotFoundException.code })
  }

  async handle(error: this, { response }: HttpContext) {
    return response.status(error.status).json({ message: error.message })
  }
}
