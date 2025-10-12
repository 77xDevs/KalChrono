import express from "express";

import { viewAttendanceContoller } from "../controllers/student/viewAttendanceController.js";

export const studentRouter = express.Router();

studentRouter.get("/viewAttendance", viewAttendanceContoller.viewAttendance)