import BadRequestException from '#exceptions/bad_request_exception'
import NotFoundException from '#exceptions/not_found_exception'
import {
  CreateCustomer,
  CreateCustomerResponse,
  CustomerDetailsResponse,
  CustomerResponse,
  UpdateCustomerResponse,
} from '#interfaces/customer_interface'
import { default as Customer } from '#models/customer'
import AddressService from '#services/address_service'
import OrderService from '#services/order_service'
import PhoneService from '#services/phone_service'
import { inject } from '@adonisjs/core'

@inject()
export default class CustomerService {
  constructor(
    protected orderService: OrderService,
    protected phoneService: PhoneService,
    protected addressService: AddressService
  ) {}

  private static readonly phoneFields = ['id', 'number']
  private static readonly addressFields = [
    'id',
    'street',
    'number',
    'complement',
    'neighborhood',
    'city',
    'state',
    'cep',
  ]
  private static readonly customerFields = ['id', 'name', 'cpf', 'phoneId', 'addressId']

  private static getCustomersQuery() {
    return Customer.query()
      .preload('address', (builder) => builder.select(CustomerService.addressFields))
      .preload('phone', (builder) => builder.select(CustomerService.phoneFields))
      .orderBy('id', 'asc')
  }

  async getAll(): Promise<CustomerResponse[]> {
    const customers = await CustomerService.getCustomersQuery().select(
      CustomerService.customerFields
    )
    return customers
  }

  async getById(id: string, month?: string, year?: string): Promise<CustomerDetailsResponse> {
    try {
      const customer = await Customer.findByOrFail({ id })
      const orders = await this.orderService.getAllByCustomerId(customer.id.toString(), month, year)

      const customerDetailsWithOrders = { customer, orders }

      return customerDetailsWithOrders
    } catch (error) {
      throw new NotFoundException('Customer not found')
    }
  }

  async create(data: CreateCustomer): Promise<CreateCustomerResponse> {
    const phone = await this.phoneService.create(data.phone)

    const address = await this.addressService.create(data.address)

    try {
      const customer = await Customer.create({
        name: data.name,
        cpf: data.cpf,
        phoneId: phone.id,
        addressId: address.id,
      })

      const createdCustomerDetails = {
        id: customer.id,
        name: customer.name,
        cpf: customer.cpf,
        phone: phone,
        address: address,
      }

      return createdCustomerDetails
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        throw new NotFoundException('Customer not found')
      }
      throw new BadRequestException('Failed to create customer')
    }
  }

  async update(id: string, data: CreateCustomer): Promise<UpdateCustomerResponse> {
    try {
      const customer = await Customer.findByOrFail({ id })

      const phone = await this.phoneService.update(customer.phoneId.toString(), data.phone)

      const address = await this.addressService.update(customer.addressId.toString(), data.address)

      customer.merge({
        name: data.name,
        cpf: data.cpf,
        phoneId: phone.id,
        addressId: address.id,
      })

      await customer.save()

      const updatedCustomerDetails = {
        id: customer.id,
        name: customer.name,
        cpf: customer.cpf,
        phone: phone,
        address: address,
      }

      return updatedCustomerDetails
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        throw new NotFoundException('Customer not found')
      }
      throw new BadRequestException('Failed to update customer')
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const customer = await Customer.findByOrFail({ id })
      await this.orderService.deleteByCustomerId(customer.id.toString())

      await customer.delete()
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        throw new NotFoundException('Customer not found')
      }
      throw new BadRequestException('Failed to delete customer')
    }
  }
}
