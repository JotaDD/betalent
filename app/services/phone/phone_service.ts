import { CreatePhone, PhoneResponse } from '#interfaces/phone_interface'
import Phone from '#models/phone'
import { filterSpecialCharacters } from '../../utils/filter_special_characters.js'

export default class PhoneService {
  async create(phone: CreatePhone): Promise<PhoneResponse> {
    const formattedPhone = filterSpecialCharacters(phone.number)
    const newPhone = await Phone.create({ number: formattedPhone })
    return newPhone
  }

  async update(id: string, data: CreatePhone): Promise<PhoneResponse> {
    const formattedPhone = filterSpecialCharacters(data.number)
    const phone = await Phone.findByOrFail({ id })
    phone.merge({ number: formattedPhone })
    await phone.save()
    return phone
  }
}
