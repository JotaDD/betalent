import User from "#models/user";
import UserInterface from "../../interfaces/user_interface.js";

export default class UserService {

  async create(data: UserInterface): Promise<UserInterface> {
    const user = await User.create(data);
    return user
  }

}