import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'customer_id' })
  declare customerId: number

  @column({ columnName: 'product_id' })
  declare productId: number

  @column()
  declare quantity: number

  @column({ columnName: 'unit_price' })
  declare unitPrice: number

  @column({ columnName: 'total_price' })
  declare totalPrice: number


  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}