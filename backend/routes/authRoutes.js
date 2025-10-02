import express from 'express';
import { studentRegistrationController } from '../controllers/auth/studentRegistrationController.js';
import { studentLoginController } from '../controllers/auth/studentLoginController.js'; 

export const authRouter = express.Router();

authRouter.post('/studentRegistration', studentRegistrationController.studentRegistration);

authRouter.post('/studentLogin', studentLoginController);
