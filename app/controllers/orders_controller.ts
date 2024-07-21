import OrderService from '#services/order_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class OrdersController {
  constructor(protected orderService: OrderService) {}
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const orders = await this.orderService.getAll()
    return response.json(orders)
  }

  /**
   * Handle form submission for the create action
   */
  // async store({ request }: HttpContext) {}
}
