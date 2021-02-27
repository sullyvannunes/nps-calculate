import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";

class UsersController {

  async create(request: Request, response: Response) {
    const { name, email } = request.body;
    const userRepository = getCustomRepository(UsersRepository);

    console.log({ name, email });
    const user = userRepository.create({ name, email });
    
    return response.json(await userRepository.save(user));
  }
}

export { UsersController };
