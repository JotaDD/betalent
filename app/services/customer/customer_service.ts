import Customer from "#models/customer";

export default class CustomerService {

  async getAll(): Promise<Customer[]> {
    const customers = await Customer.query()
      .preload('address', builder => {
        builder.select(['id', 'street', 'number', 'complement', 'neighborhood', 'city', 'state', 'cep'])
      })
      .preload('phone', builder => builder.select(['id', 'number']).orderBy('id', 'asc'))
      .orderBy('id', 'asc');

    return customers;
  }


}
