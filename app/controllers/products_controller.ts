import ProductService from '#services/product/product_service'
import { inject } from '@adonisjs/core'
import { ResponseStatus, type HttpContext } from '@adonisjs/core/http'

@inject()
export default class ProductsController {
  constructor(protected productService: ProductService) { }
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const products = await this.productService.getAll()
    return response.status(ResponseStatus.Ok).json(products)
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