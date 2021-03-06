import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsers } from "../repositories/SurveysUsersRepository";
import { UsersRepository } from "../repositories/UsersRepository";
import SendMailService from "../services/SendMailService";
import { resolve } from 'path';

class SendMailsController {
  async execute(request: Request, response: Response) {
    const { email, survey_id } = request.body;

    const usersRepository = getCustomRepository(UsersRepository);
    const surveysRepository = getCustomRepository(SurveysRepository);
    const surveysUsersRepository = getCustomRepository(SurveysUsers);

    const user = await usersRepository.findOne({ email });

    if(!user) {
      return response.status(400).json({
        error: 'User does not exist'
      });
    }

    const survey = await surveysRepository.findOne({ id: survey_id });

    if(!survey) {
      return response.status(400).json({
        error: 'Survey does not exist'
      });
    }

    const npsPath = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs');
    const surveysUsersAlreadyExists = await surveysUsersRepository.findOne({
      where: { user_id: user.id, survey_id: survey.id },
      relations: ['user', 'survey']
    });

    const variables = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      id: '',
      link: process.env.URL_MAIL
    };

    if(surveysUsersAlreadyExists) {
      variables.id = surveysUsersAlreadyExists.id;
      await SendMailService.execute(email, survey.title, variables, npsPath);
      return response.json(surveysUsersAlreadyExists);
    }

    const surveysUsers = surveysUsersRepository.create({
      user_id: user.id,
      survey_id
    });

    await surveysUsersRepository.save(surveysUsers);
    variables.id = surveysUsers.id;

    await SendMailService.execute(email, survey.title, variables, npsPath);

    return response.status(201).json(surveysUsers);
  }
}

export { SendMailsController };
