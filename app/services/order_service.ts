import { OrderResponse } from '#interfaces/order_interface'
import Order from '#models/order'
import { Exception } from '@adonisjs/core/exceptions'
import { DateTime } from 'luxon'

export default class OrderService {
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
      throw new Exception('Invalid date')
    }
  }

  static async filterByDate(id: string, month: string, year: string): Promise<OrderResponse[]> {
    const monthStart = DateTime.local(+year, +month, 1)

    if (!monthStart.isValid) {
      throw new Exception('Invalid date')
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
}
