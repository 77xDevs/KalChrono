import express from 'express'
import { studentRegistrationController } from '../controllers/auth/studentRegistrationController.js'

import { teacherRegistrationController } from '../controllers/auth/teacherRegistrationController.js'

export const authRouter = express.Router();

authRouter.post('/studentRegistration', studentRegistrationController.studentRegistration);

authRouter.post('/teacherRegistration', teacherRegistrationController.teacherRegistration);

