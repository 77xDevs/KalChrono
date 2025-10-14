import express from "express";

import { viewAttendanceController } from "../controllers/student/viewAttendanceController.js";
import { viewCourseAttendanceController } from "../controllers/student/viewCourseAttendanceController.js";

export const studentRouter = express.Router();

studentRouter.get("/viewAttendance", viewAttendanceController.viewAttendance);
studentRouter.get("/viewCourseAttendance", viewCourseAttendanceController.viewCourseAttendance);