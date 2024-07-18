import User from "#models/user";
import hash from "@adonisjs/core/services/hash";
import jwt from "jsonwebtoken";

export default class AuthService {
  async generateToken(email: string) {
    const token = jwt.sign(
      {
        email: email,
      },
      process.env.APP_KEY as string,
      {
        expiresIn: "1d",
      }
    )
    return token
  }


}