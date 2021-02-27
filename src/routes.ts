import { Router } from "express";
import { UsersController } from "./controllers/UsersController";
import { SurveysController } from "./controllers/SurveysController";

const router = Router();

const usersController = new UsersController();
const surveysController = new SurveysController();

router.get('/surveys', surveysController.show);

router.post('/users', usersController.create);
router.post('/surveys', surveysController.create);

 export { router };
