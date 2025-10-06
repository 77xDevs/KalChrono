import express from 'express'
import { studentRegistrationController } from '../controllers/auth/studentRegistrationController.js'
import { studentLoginController } from '../controllers/auth/studentLoginController.js';

import { teacherRegistrationController } from '../controllers/auth/teacherRegistrationController.js'

export const authRouter = express.Router();

authRouter.post('/studentRegistration', studentRegistrationController.studentRegistration);

authRouter.post('/studentLogin', studentLoginController.studentLogin);

authRouter.post('/teacherRegistration', teacherRegistrationController.teacherRegistration);

export default authRouter;