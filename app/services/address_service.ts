import BadRequestException from '#exceptions/bad_request_exception'
import NotFoundException from '#exceptions/not_found_exception'
import { AddressResponse, CreateAddress, UpdateAddress } from '#interfaces/address_interface'
import Address from '#models/address'
import { filterSpecialCharacters } from '../utils/filter_special_characters.js'

export default class AddressService {
  async create(address: CreateAddress): Promise<AddressResponse> {
    try {
      const formattedCep = filterSpecialCharacters(address.cep)
      const formattedState = address.state.toUpperCase()
      const newAddress = await Address.create({
        ...address,
        cep: formattedCep,
        state: formattedState,
      })
      return newAddress
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        throw new NotFoundException('Address not found')
      }
      throw new BadRequestException('Failed to create address')
    }
  }

  async update(id: string, data: UpdateAddress): Promise<AddressResponse> {
    try {
      const formattedCep = filterSpecialCharacters(data.cep)
      const formattedState = data.state.toUpperCase()
      const address = await Address.findByOrFail({ id })
      address.merge({ ...data, cep: formattedCep, state: formattedState })
      await address.save()
      return address
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        throw new NotFoundException('Address not found')
      }
      throw new BadRequestException('Failed to update address')
    }
  }
}
