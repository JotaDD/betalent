import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'addresses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      
      table.string('rua',254).notNullable()

      table.string('numero',20).notNullable()

      table.string('complemento',50)

      table.string('bairro',50).notNullable()

      table.string('cidade',50).notNullable() 

      table.string('estado',2).notNullable()

      table.string('cep',20).notNullable()

      table.integer('customer_id').unsigned().references('customers.id')


      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}