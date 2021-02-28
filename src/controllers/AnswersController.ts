import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysUsers } from "../repositories/SurveysUsersRepository";

class AnswersController {
  async execute(request: Request, response: Response) {
    const { value } = request.params;
    const { u } = request.query;

    const surveysUsersRepository = getCustomRepository(SurveysUsers);

    const surveyUser = await surveysUsersRepository.findOne({
      id: String(u)
    })

    if(!surveyUser) {
      return response.status(400).json({
        "error": "Survey User Does not Exist!"
      });
    }

    surveyUser.value = Number(value);
    await surveysUsersRepository.save(surveyUser);

    return response.json(surveyUser);
  }
}

export { AnswersController };
