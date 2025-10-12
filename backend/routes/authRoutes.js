import express from 'express'

import { studentRegistrationController } from '../controllers/auth/studentRegistrationController.js'
import { teacherRegistrationController } from '../controllers/auth/teacherRegistrationController.js'
import { studentLoginController } from '../controllers/auth/studentLoginController.js';
import { teacherLoginController } from '../controllers/auth/teacherLoginController.js'

export const authRouter = express.Router();

authRouter.post('/studentRegistration', studentRegistrationController.studentRegistration);
authRouter.post('/teacherRegistration', teacherRegistrationController.teacherRegistration);
authRouter.post('/teacherLogin', teacherLoginController.teacherLogin);
authRouter.post('/studentLogin', studentLoginController.studentLogin);
