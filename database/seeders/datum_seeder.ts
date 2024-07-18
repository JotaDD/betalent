import addressesSeed from '#database/seeds/address_seed'
import customersSeed from '#database/seeds/customer_seed'
import ordersSeed from '#database/seeds/order_seed'
import phonesSeed from '#database/seeds/phone_seed'
import productsSeed from '#database/seeds/product_seed'
import userSeed from '#database/seeds/user_seed'
import Address from '#models/address'
import Customer from '#models/customer'
import Order from '#models/order'
import Phone from '#models/phone'
import Product from '#models/product'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await User.create(userSeed)

    await Product.createMany(productsSeed)

    await Customer.createMany(customersSeed)

    await Address.createMany(addressesSeed)

    await Phone.createMany(phonesSeed)

    await Order.createMany(ordersSeed)

  }
}