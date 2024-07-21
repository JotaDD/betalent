import Customer from '#models/customer'
import { CreateAddress } from './address_interface.js'
import { OrderResponse } from './order_interface.js'
import { CreatePhone } from './phone_interface.js'

export interface CustomerDetailsResponse {
  customer: Customer
  orders: OrderResponse[]
}

export interface CreateCustomer {
  name: string
  cpf: string
  phone: CreatePhone
  address: CreateAddress
}

export interface CustomerResponse extends CreateCustomer {
  id: number
}

export interface CreateCustomerResponse extends CustomerResponse {}

export interface UpdateCustomerResponse extends CreateCustomerResponse {}
