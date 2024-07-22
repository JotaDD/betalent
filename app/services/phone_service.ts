import BadRequestException from '#exceptions/bad_request_exception'
import NotFoundException from '#exceptions/not_found_exception'
import { CreatePhone, PhoneResponse } from '#interfaces/phone_interface'
import Phone from '#models/phone'
import { filterSpecialCharacters } from '../utils/filter_special_characters.js'

export default class PhoneService {
  async create(phone: CreatePhone): Promise<PhoneResponse> {
    try {
      const formattedPhone = filterSpecialCharacters(phone.number)
      const newPhone = await Phone.create({ number: formattedPhone })
      return newPhone
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        throw new NotFoundException('Phone not found')
      }
      throw new BadRequestException('Failed to create phone')
    }
  }

  async update(id: string, data: CreatePhone): Promise<PhoneResponse> {
    try {
      const formattedPhone = filterSpecialCharacters(data.number)
      const phone = await Phone.findByOrFail({ id })
      phone.merge({ number: formattedPhone })
      await phone.save()
      return phone
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        throw new NotFoundException('Phone not found')
      }
      throw new BadRequestException('Failed to update phone')
    }
  }
}
