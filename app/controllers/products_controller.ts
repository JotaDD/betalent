import ProductService from '#services/product/product_service'
import { productValidator } from '#validators/product'
import { inject } from '@adonisjs/core'
import { ResponseStatus, type HttpContext } from '@adonisjs/core/http'

@inject()
export default class ProductsController {
  constructor(protected productService: ProductService) { }

  async index({ response }: HttpContext) {
    const products = await this.productService.getAll()
    return response.status(ResponseStatus.Ok).json(products)
  }

  async active({ response }: HttpContext) {
    const products = await this.productService.getAllActive()
    return response.status(ResponseStatus.Ok).json(products)
  }

  async create({ request, response }: HttpContext) {
    const data = await request.validateUsing(productValidator)
    const product = await this.productService.create(data)
    return response.status(ResponseStatus.Created).json(product)
  }

  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(productValidator)
    console.log(data)
    const product = await this.productService.create(data)
    return response.status(ResponseStatus.Created).json(product)
  }

  async show({ params, response }: HttpContext) {
    const { id } = params
    const product = await this.productService.getById(id)
    return response.status(ResponseStatus.Ok).json(product)
  }


  /**
   * Handle form submission for the edit action
   */
  // async update({ params, request }: HttpContext) { }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) { }
}