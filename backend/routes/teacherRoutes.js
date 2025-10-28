import express from "express";

import { getTeacherDetailsController } from "../controllers/teacher/getTeacherDetailsController.js";
import { editAttendanceController } from "../controllers/teacher/editAttendanceController.js";
import { getStudentDetailsController } from "../controllers/teacher/getStudentDetailsController.js";

export const teacherRouter = express.Router();


teacherRouter.get("/getDetails", getTeacherDetailsController.getTeacherDetails);
teacherRouter.get("/getStudentDetails",getStudentDetailsController.getStudentDetails);
teacherRouter.post("/editAttendance", editAttendanceController.editAttendance);

