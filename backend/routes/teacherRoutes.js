import express from "express";

import { getTeacherDetailsController } from "../controllers/teacher/getTeacherDetailsController.js";

export const teacherRouter = express.Router();

teacherRouter.get("/getDetails", getTeacherDetailsController.getTeacherDetails);
