import { CreateProduct, UpdateProduct } from '#interfaces/product_interface'
import Product from '#models/product'

interface ActiveOnly {
  activeOnly?: boolean
}
export default class ProductService {
  private static readonly productFields = ['id', 'name', 'quantity', 'price', 'description']

  private readonly getAllProductsQuery = Product.query()
    .select(ProductService.productFields)
    .orderBy('name', 'asc')

  async getAll({ activeOnly }: ActiveOnly): Promise<Product[]> {
    if (activeOnly) {
      const activeProducts = await this.getAllProductsQuery.where('isActive', '1')
      return activeProducts
    }
    const allProducts = await this.getAllProductsQuery
    return allProducts
  }

  async create(data: CreateProduct): Promise<Product> {
    const createdProduct = await Product.create(data)
    return createdProduct
  }

  async getById(id: string): Promise<Product> {
    const product = await Product.findByOrFail({ id })
    return product
  }

  async update(id: string, data: UpdateProduct): Promise<Product> {
    const product = await Product.findOrFail(id)
    await product.merge(data).save()

    return product
  }

  async delete(id: string): Promise<void> {
    const product = await Product.findByOrFail({ id })
    await product.merge({ isActive: false }).save()
  }
}
