import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import UnauthorizedException from '#exceptions/unauthorized_exception'
import NotFoundException from '#exceptions/not_found_exception'
import { inject } from '@adonisjs/core'
import AuthService from '#services/auth_service'
import { Authenticators } from '@adonisjs/auth/types'

/**
 * Auth middleware is used authenticate HTTP requests and deny
 * access to unauthenticated users.
 */
@inject()
export default class AuthMiddleware {
  constructor(protected authService: AuthService) {}
  /**
   * The URL to redirect to, when authentication fails
   */
  redirectTo = '/login'

  async handle(
    ctx: HttpContext,
    next: NextFn,
    options: {
      guards?: (keyof Authenticators)[]
    } = {}
  ) {
    const token = ctx.request.header('Authorization')?.split(' ')[1]

    if (!token) {
      throw new NotFoundException('Token not found')
    }

    try {
      await this.authService.verifyToken(token)
    } catch (error) {
      throw new UnauthorizedException()
    }

    return next()
  }
}
