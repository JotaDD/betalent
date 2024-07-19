import CustomerDto from "#controllers/dto/customer/customer_dto";
import Customer from "#models/customer";

export default class CustomerService {

  async getAll(): Promise<CustomerDto[]> {
    const customers = await Customer.query()
      .preload('address',
        builder => builder.select([
          'id', 'street', 'number',
          'complement', 'neighborhood',
          'city', 'state', 'cep'
        ]))
      .preload('phone',
        (builder) => builder.select(['id', 'number'])
          .orderBy('id', 'asc'))
      .orderBy('id', 'asc');

    const response = customers.map(
      (customer) => CustomerDto.fromModel(customer)
    )

    return response;
  }


}
