import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'customers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('name',255).notNullable()

      table.string('cpf', 14).notNullable().unique()

      table.integer('address_id').unsigned().references('addresses.id').onDelete('CASCADE')
      
      table.integer('phone_id').unsigned().references('phones.id').onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}