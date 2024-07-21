import ProductService from '#services/product/product_service'
import { createProductValidator, updateProductValidator } from '#validators/product'
import { inject } from '@adonisjs/core'
import { ResponseStatus, type HttpContext } from '@adonisjs/core/http'

@inject()
export default class ProductsController {
  constructor(protected productService: ProductService) {}

  async index({ response }: HttpContext) {
    const products = await this.productService.getAll({ activeOnly: false })
    return response.status(ResponseStatus.Ok).json(products)
  }

  async active({ response }: HttpContext) {
    const products = await this.productService.getAll({ activeOnly: true })
    return response.status(ResponseStatus.Ok).json(products)
  }

  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(createProductValidator)
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
  async update({ params, request, response }: HttpContext) {
    const { id } = params
    const data = await request.validateUsing(updateProductValidator)

    const product = await this.productService.update(id, data)
    return response.status(ResponseStatus.Ok).json(product)
  }

  /**
   * Delete record
   */
  async delete({ params, response }: HttpContext) {
    const { id } = params
    await this.productService.delete(id)
    return response.status(ResponseStatus.Ok).json({
      message: 'Product deleted successfully',
    })
  }
}
