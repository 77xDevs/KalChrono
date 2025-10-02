import express from 'express'
import { studentRegistrationController } from '../controllers/auth/studentRegistrationController.js'


export const authRouter = express.Router();

authRouter.post('/studentRegistration', studentRegistrationController.studentRegistration);

