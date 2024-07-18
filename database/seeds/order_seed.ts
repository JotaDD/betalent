import productsSeed from "./product_seed.js";

const ordersSeed = [
  {
    customerId: 1,
    productId: 1,
    quantity: 1,
    unitPrice: productsSeed[0].price,
    totalPrice: productsSeed[0].price * 1
  },
  {
    customerId: 2,
    productId: 2,
    quantity: 2,
    unitPrice: productsSeed[1].price,
    totalPrice: productsSeed[1].price * 2
  },
  {
    customerId: 3,
    productId: 3,
    quantity: 3,
    unitPrice: productsSeed[2].price,
    totalPrice: productsSeed[2].price * 3
  }
]

export default ordersSeed;