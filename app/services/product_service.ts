import BadRequestException from '#exceptions/bad_request_exception'
import NotFoundException from '#exceptions/not_found_exception'
import {
  CreateProduct,
  CreateProductResponse,
  ProductResponse,
  UpdateProduct,
} from '#interfaces/product_interface'
import Product from '#models/product'

interface ActiveOnly {
  activeOnly?: boolean
}
export default class ProductService {
  private static readonly productFields = ['id', 'name', 'quantity', 'price', 'description']

  private readonly getAllProductsQuery = Product.query()
    .select(ProductService.productFields)
    .orderBy('name', 'asc')

  async getAll({ activeOnly }: ActiveOnly): Promise<ProductResponse[]> {
    if (activeOnly) {
      const activeProducts = await this.getAllProductsQuery.where('isActive', '1')
      return activeProducts
    }
    const allProducts = await this.getAllProductsQuery
    return allProducts
  }

  async create(data: CreateProduct): Promise<CreateProductResponse> {
    try {
      const createdProduct = await Product.create(data)
      return createdProduct
    } catch (error) {
      throw new BadRequestException('Failed to create product')
    }
  }

  async getById(id: string): Promise<ProductResponse> {
    try {
      const product = await Product.findOrFail(id)
      return product
    } catch (error) {
      throw new NotFoundException('Product not found')
    }
  }

  async update(id: string, data: UpdateProduct): Promise<ProductResponse> {
    try {
      const product = await Product.findOrFail(id)
      await product.merge(data).save()
      return product
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        throw new NotFoundException(`Product not found `)
      }
      throw new BadRequestException('Failed to update product')
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const product = await Product.findByOrFail({ id })
      await product.merge({ isActive: false }).save()
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        throw new NotFoundException(`Product not found`)
      }
      throw new BadRequestException('Failed to delete product')
    }
  }

  async validateIfProductIsAvailable(
    productId: string,
    quantity: number
  ): Promise<ProductResponse> {
    const product = await this.getAllProductsQuery
      .where('id', productId.toString())
      .where('isActive', '1')
      .first()

    if (product && product.quantity > quantity) {
      return product
    }

    throw new BadRequestException('Product not available or quantity is not enough')
  }
}
