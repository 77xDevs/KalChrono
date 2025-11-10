import express from "express";

import { getTeacherDetailsController } from "../controllers/teacher/getTeacherDetailsController.js";
import { markAttendanceController } from "../controllers/teacher/markAttendanceController.js";

export const teacherRouter = express.Router();

teacherRouter.get("/getDetails", getTeacherDetailsController.getTeacherDetails);
teacherRouter.post("/markAttendance", markAttendanceController.markAttendance);