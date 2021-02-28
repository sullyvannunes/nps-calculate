import { Router } from "express";
import { UsersController } from "./controllers/UsersController";
import { SurveysController } from "./controllers/SurveysController";
import { SendMailsController } from "./controllers/SendMailsController";
import { AnswersController } from "./controllers/AnswersController";
import { NpsController } from "./controllers/NpsController";

const router = Router();

const usersController = new UsersController();
const surveysController = new SurveysController();
const sendMailController = new SendMailsController();
const answersController = new AnswersController();
const npsController = new NpsController();

router.get('/surveys', surveysController.index );
router.get('/answers/:value', answersController.execute);
router.get('/nps/:survey_id', npsController.execute);

router.post('/users', usersController.create);
router.post('/surveys', surveysController.create.bind(surveysController));
router.post('/sendMail', sendMailController.execute);

 export { router };
