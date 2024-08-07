import { loginValidator, registerValidator } from '#validators/auth'
import { ResponseStatus, type HttpContext } from '@adonisjs/core/http'
import UserService from '#services/user_service'
import AuthService from '#services/auth_service'
import { inject } from '@adonisjs/core'
import UnauthorizedException from '#exceptions/unauthorized_exception'

@inject()
export default class AuthController {
  constructor(
    protected userService: UserService,
    protected authService: AuthService
  ) {}

  async signup({ request, response }: HttpContext) {
    const data = await request.validateUsing(registerValidator)
    await this.userService.create(data)

    return response.status(ResponseStatus.Created).json({
      message: 'User created successfully',
    })
  }

  async login({ request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    const isValid = await this.authService.validatePassword(email, password)

    if (!isValid) {
      throw new UnauthorizedException()
    }

    const token = await this.authService.generateToken(email)

    if (!token) {
      throw new UnauthorizedException()
    }

    return response.status(ResponseStatus.Ok).json({ token })
  }
}
