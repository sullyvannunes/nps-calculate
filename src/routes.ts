import { Router } from "express";
import { UsersController } from "./controllers/UsersController";
import { SurveysController } from "./controllers/SurveysController";
import { SendMailsController } from "./controllers/SendMailsController";

const router = Router();

const usersController = new UsersController();
const surveysController = new SurveysController();
const sendMailController = new SendMailsController();

router.get('/surveys', surveysController.index );

router.post('/users', usersController.create);
router.post('/surveys', surveysController.create.bind(surveysController));
router.post('/sendMail', sendMailController.execute);

 export { router };
