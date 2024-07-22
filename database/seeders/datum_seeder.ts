import Address from '#models/address'
import Customer from '#models/customer'
import Order from '#models/order'
import Phone from '#models/phone'
import Product from '#models/product'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import addressesSeed from '../seeds/address_seed.js'
import customersSeed from '../seeds/customer_seed.js'
import ordersSeed from '../seeds/order_seed.js'
import phonesSeed from '../seeds/phone_seed.js'
import productsSeed from '../seeds/product_seed.js'
import userSeed from '../seeds/user_seed.js'

export default class extends BaseSeeder {
  async run() {
    await User.create(userSeed)

    await Product.createMany(productsSeed)

    await Address.createMany(addressesSeed)

    await Phone.createMany(phonesSeed)

    await Customer.createMany(customersSeed)

    await Order.createMany(ordersSeed)
  }
}
