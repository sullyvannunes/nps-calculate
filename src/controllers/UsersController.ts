import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../models/User";

class UsersController {

  async create(request: Request, response: Response) {
    const { name, email } = request.body;
    const userRepository = getRepository(User);

    const user = userRepository.create({ name, email });
    
    return response.json(await userRepository.save(user));
  }
}

export { UsersController };