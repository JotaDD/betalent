import CreateProductDto from "#controllers/dto/product/create_product_dto";
import ProductDto from "#controllers/dto/product/product_dto";
import UpdateProductDto from "#controllers/dto/product/update_product_dto";
import Product from "#models/product";

export default class ProductService {

  private sortAlphabeticallyByName(products: Product[]) {
    return products.sort((a, b) => {
      return a.name.localeCompare(b.name)
    })
  }

  async getAll(): Promise<ProductDto[]> {
    const products = await Product.all()

    const sortedProducts = this.sortAlphabeticallyByName(products)

    const response = sortedProducts.map((product) => {
      return ProductDto.fromModel(product)
    })

    return response
  }

  async getAllActive(): Promise<ProductDto[]> {
    const products = await Product.findManyBy({ isActive: true })

    const sortedProducts = this.sortAlphabeticallyByName(products)

    const response = sortedProducts.map((product) => {
      return ProductDto.fromModel(product)
    })

    return response
  }

  async create(data: CreateProductDto): Promise<ProductDto> {
    const product = CreateProductDto.toModel(data)

    const createdProduct = await Product.create(product)

    const response = ProductDto.fromModel(createdProduct)

    return response
  }

  async getById(id: string): Promise<ProductDto> {
    const product = await Product.findByOrFail({ id })
    return product
  }

  async update(id: string, data: UpdateProductDto): Promise<ProductDto> {
    const product = await Product.findByOrFail({ id })
    product.merge(data)
    await product.save()
    return product
  }

  async delete(id: string): Promise<void> {
    const product = await Product.findByOrFail({ id })
    product.merge({ isActive: false })
    await product.save()
  }


}