import { Request, Response } from "express";
import { getCustomRepository, IsNull, Not } from "typeorm";
import { SurveyUser } from "../models/SurveyUser";
import { SurveysUsers } from "../repositories/SurveysUsersRepository";

class NpsController {
  async execute(request: Request, response: Response) {
    const { survey_id } = request.params;

    const surveysUsersRepository = getCustomRepository(SurveysUsers);

    const surveyUsers: SurveyUser[] = await surveysUsersRepository.find({
      survey_id,
      value: Not(IsNull())
    });

    const detractor = surveyUsers.filter(
      (surveyUser) => surveyUser.value >= 0 && surveyUser.value <= 6
    ).length;

    const promotors = surveyUsers.filter(
      (surveyUser) => surveyUser.value >= 9 && surveyUser.value <= 10
    ).length;

    const passive = surveyUsers.filter(
      (surveyUser) => surveyUser.value >= 7 && surveyUser.value <= 8
    ).length;

    const totalAnswers = surveyUsers.length;

    const nps = (((promotors - detractor) / totalAnswers) * 100).toFixed(2);

    return response.json({
      detractor,
      passive,
      promotors,
      totalAnswers,
      nps
    })
  }
}

export { NpsController };