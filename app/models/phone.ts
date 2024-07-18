import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Phone extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare number: string

  @column({columnName: 'customer_id'})
  declare customerId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}