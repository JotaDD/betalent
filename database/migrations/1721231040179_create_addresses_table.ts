import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'addresses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      
      table.string('street',254).notNullable()

      table.string('number',20).notNullable()

      table.string('complement',50)

      table.string('neighborhood',50).notNullable()

      table.string('city',50).notNullable() 

      table.string('state',2).notNullable()

      table.string('cep',20).notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}