import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import * as yup from 'yup';
import { validate } from "uuid";

class UsersController {

  async create(request: Request, response: Response) {
    const { name, email } = request.body;

    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required()
    })

    try {
      await schema.validate(request.body);
    } catch(err) {
      return response.status(400).json(err);
    }

    const userRepository = getCustomRepository(UsersRepository);

    const user = userRepository.create({ name, email });

    return response
      .status(201)
      .json(await userRepository.save(user));
  }
}

export { UsersController };
