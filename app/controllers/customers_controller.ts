import CustomerService from '#services/customer/customer_service'
import { customerValidator } from '#validators/customer'
import { inject } from '@adonisjs/core'
import { ResponseStatus, type HttpContext } from '@adonisjs/core/http'

@inject()
export default class CustomersController {
  constructor(private customerService: CustomerService) {}

  async index({ response }: HttpContext) {
    const customers = await this.customerService.getAll()
    return response.status(ResponseStatus.Ok).json(customers)
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(customerValidator)
    const customer = await this.customerService.create(data)
    return response.status(ResponseStatus.Created).json(customer)
  }
  /**
   * Update individual record
   */
  async update({ params, request, response }: HttpContext) {
    const { id } = params
    const data = await request.validateUsing(customerValidator)
    const customer = await this.customerService.update(id, data)
    return response.status(ResponseStatus.Ok).json(customer)
  }

  /**
   * Show individual record
   */
  async show({ params, request, response }: HttpContext) {
    const { id } = params
    const { month, year } = request.qs()

    const customer = await this.customerService.getById(id, month, year)

    return response.status(ResponseStatus.Ok).json(customer)
  }

  /**
   * Delete record
   */
  async delete({ params, response }: HttpContext) {
    const { id } = params
    await this.customerService.delete(id)

    return response.status(ResponseStatus.Ok).json({
      message: 'Customer and Orders deleted successfully',
    })
  }
}
