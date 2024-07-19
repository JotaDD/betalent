import Product from "#models/product";
import { HttpContext } from "@adonisjs/core/http";

export default class CreateProductDto {
  constructor(
    public name: string,
    public quantity: number,
    public price: number,
    public description: string,
    public isActive?: boolean
  ) { }

  static toModel = (data: CreateProductDto): Product => {
    const product = new Product()
    product.name = data.name
    product.quantity = data.quantity
    product.price = data.price
    product.description = data.description
    product.isActive = data.isActive ?? true
    return product
  }
}
