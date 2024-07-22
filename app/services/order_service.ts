import BadRequestException from '#exceptions/bad_request_exception'
import NotFoundException from '#exceptions/not_found_exception'
import { CreateOrder, CreateOrderResponse, OrderResponse } from '#interfaces/order_interface'
import Order from '#models/order'
import { inject } from '@adonisjs/core'
import { DateTime } from 'luxon'
import ProductService from './product_service.js'

@inject()
export default class OrderService {
  constructor(private productService: ProductService) { }
  private static readonly productFields = ['id', 'name', 'quantity', 'price', 'description']

  private static readonly orderFields = ['id', 'customerId', 'productId', 'quantity', 'createdAt']

  private static getOrdersQuery() {
    return Order.query().preload('product', (builder) => builder.select(OrderService.productFields))
  }

  async getAll(): Promise<OrderResponse[]> {
    return await OrderService.getOrdersQuery()
  }

  async getAllByCustomerId(id: string, month?: string, year?: string): Promise<OrderResponse[]> {
    if (month && year) {
      const orders = await OrderService.filterByDate(id, month, year)
      return orders
    }

    try {
      const orders = await OrderService.getOrdersQuery()
        .select(OrderService.orderFields)
        .where('customer_id', id)
        .orderBy('createdAt', 'asc')

      return orders
    } catch (error) {
      throw new Error('ID not found')
    }
  }

  static async filterByDate(id: string, month: string, year: string): Promise<OrderResponse[]> {
    const monthStart = DateTime.local(+year, +month, 1)

    if (!monthStart.isValid) {
      throw new Error('Invalid date')
    }

    const monthEnd = monthStart.endOf('month')

    const filteredOrders = await OrderService.getOrdersQuery()
      .select(OrderService.orderFields)
      .where('customer_id', id)
      .whereBetween('createdAt', [monthStart.toISO(), monthEnd.toISO()])
      .orderBy('createdAt', 'asc')

    return filteredOrders
  }

  async deleteByCustomerId(id: string): Promise<void> {
    await Order.query().where('customer_id', id).delete()
  }

  async create(data: CreateOrder): Promise<CreateOrderResponse> {
    try {
      const product = await this.productService.validateIfProductIsAvailable(
        data.productId,
        data.quantity
      )

      const totalPrice = data.unitPrice
        ? data.unitPrice * data.quantity
        : product.price * data.quantity

      const orderToBeCreated = {
        customerId: +data.customerId,
        productId: +data.productId,
        quantity: data.quantity,
        unitPrice: data.unitPrice ? data.unitPrice : product.price,
        totalPrice: totalPrice,
      }

      const order = await Order.create(orderToBeCreated)
      await this.productService.update(data.productId, {
        ...product,
        quantity: product.quantity - data.quantity,
      })

      const createdOrder = {
        id: order.id,
        customerId: order.customerId,
        productId: order.productId,
        quantity: order.quantity,
        unitPrice: order.unitPrice,
        totalPrice: order.totalPrice,
      }

      return createdOrder
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }
}
