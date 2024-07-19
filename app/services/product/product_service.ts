import ProductDto from "#controllers/dto/product_dto";
import Product from "#models/product";

export default class ProductService {

  async getAll(): Promise<ProductDto[]> {
    const products = await Product.findManyBy({ isActive: true })

    const sortedProducts = products.sort((a, b) => {
      return a.name.localeCompare(b.name)
    })

    const response = sortedProducts.map((product) => {
      return ProductDto.fromModel(product)
    })

    return response
  }

}