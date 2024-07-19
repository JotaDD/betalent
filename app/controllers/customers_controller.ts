import CustomerService from '#services/customer/customer_service'
import { inject } from '@adonisjs/core'
import { ResponseStatus, type HttpContext } from '@adonisjs/core/http'

@inject()
export default class CustomersController {
  constructor(private customerService: CustomerService) { }

  async index({ response }: HttpContext) {
    const customers = await this.customerService.getAll()
    return response.status(ResponseStatus.Ok).json(customers)
  }

  /**
   * Display form to create a new record
   */
  async create({ }: HttpContext) { }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) { }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) { }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) { }

  /**
   * Handle form submission for the edit action
   */
  // async update({ params, request }: HttpContext) { }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) { }
}