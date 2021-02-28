import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { Survey } from "../models/Survey";
import { SurveysRepository } from "../repositories/SurveysRepository";

class SurveysController {
  async create(request: Request, response: Response) {
    const { title, description } = request.body;

    const surveyRepository = getCustomRepository(SurveysRepository);

    const survey = surveyRepository.create({ title, description });
    await surveyRepository.save(survey);

    response.status(201).json(survey);
  }

  async index(request: Request, response: Response) {
    const surveyRepository = getCustomRepository(SurveysRepository);

    const surveys: Survey[] = await surveyRepository.find({});
    response.status(200).json(surveys);
  }
}

export { SurveysController };