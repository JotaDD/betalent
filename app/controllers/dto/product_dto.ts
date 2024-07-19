import Product from "#models/product";

export default class ProductDto {

  constructor(
    public id: number,
    public name: string,
    public quantity: number,
    public price: number,
    public description: string
  ) { }

  static fromModel(product: Product): ProductDto {
    return new ProductDto(
      product.id,
      product.name,
      product.quantity,
      product.price,
      product.description
    );
  }

}
