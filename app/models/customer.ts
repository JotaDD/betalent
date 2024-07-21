import Address from '#models/address'
import Phone from '#models/phone'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class Customer extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare cpf: string

  @column({ columnName: 'address_id' })
  declare addressId: number

  @column({ columnName: 'phone_id' })
  declare phoneId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Address)
  declare address: BelongsTo<typeof Address>

  @belongsTo(() => Phone)
  declare phone: BelongsTo<typeof Phone>
}
