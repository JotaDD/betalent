import BadRequestException from '#exceptions/bad_request_exception'
import User from '#models/user'
import UserInterface from '../interfaces/user_interface.js'

export default class UserService {
  async create(data: UserInterface): Promise<UserInterface> {
    try {
      const user = await User.create(data)
      return user
    } catch (error) {
      throw new BadRequestException('Failed to create user')
    }
  }
}
