import { ProductInterface } from './product_interface.js'

export default interface OrderInterface {
  id: number
  customerId: number
  quantity: number
  unitPrice: number
  totalPrice: number
  product: ProductInterface
}

export interface OrderResponse extends OrderInterface {}
