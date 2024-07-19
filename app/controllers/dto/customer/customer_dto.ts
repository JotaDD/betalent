import AddressInterface from "#interfaces/address_interface";
import PhoneInterface from "#interfaces/phone_interface";
import Customer from '#models/customer';


export default class CustomerDto {
  constructor(
    public id: number,
    public cpf: string,
    public name: string,
    public phone: PhoneInterface,
    public address: AddressInterface
  ) { }

  static fromModel(customer: Customer): CustomerDto {
    return new CustomerDto(
      customer.id,
      customer.cpf,
      customer.name,
      customer.phone,
      customer.address
    );
  }
}