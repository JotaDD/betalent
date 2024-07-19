import CreateProductDto from "#controllers/dto/create_product_dto";
import ProductDto from "#controllers/dto/product_dto";
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



}