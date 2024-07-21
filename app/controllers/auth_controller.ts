import { loginValidator, registerValidator } from '#validators/auth'
import { ResponseStatus, type HttpContext } from '@adonisjs/core/http'
import UserService from '#services/user/user_service'
import AuthService from '#services/auth_service'
import { inject } from '@adonisjs/core'

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
      return response.status(ResponseStatus.Unauthorized).json({
        message: 'Invalid credentials',
      })
    }

    const token = await this.authService.generateToken(email)

    if (!token) {
      return response.status(ResponseStatus.Unauthorized).json({
        message: 'Invalid credentials',
      })
    }

    return response.status(ResponseStatus.Ok).json({ token })
  }
}
