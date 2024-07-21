import { AddressResponse, CreateAddress, UpdateAddress } from '#interfaces/address_interface'
import Address from '#models/address'
import { filterSpecialCharacters } from '../../utils/filter_special_characters.js'

export default class AddressService {
  async create(address: CreateAddress): Promise<AddressResponse> {
    const formattedCep = filterSpecialCharacters(address.cep)
    const formattedState = address.state.toUpperCase()
    const newAddress = await Address.create({
      ...address,
      cep: formattedCep,
      state: formattedState,
    })
    return newAddress
  }

  async update(id: string, data: UpdateAddress): Promise<AddressResponse> {
    const formattedCep = filterSpecialCharacters(data.cep)
    const formattedState = data.state.toUpperCase()
    const address = await Address.findByOrFail({ id })
    address.merge({ ...data, cep: formattedCep, state: formattedState })
    await address.save()
    return address
  }
}
