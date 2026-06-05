import express from "express";
import {
  enrollStudent,
  getEnrolledCourses,
  getEnrolledCourse,
  unEnroll,
} from "../controllers/Enroll.controller.js";

import { protect, role } from "../Middleware/Auth.middleware.js";
import { isEnrolled } from "../Middleware/Role.middleware.js";

const router = express.Router();

router.post(
  "/enroll/:courseId",
  protect,
  role("student"),

  enrollStudent,
);

router.get("/enroll/", protect, isEnrolled, getEnrolledCourses);

router.get("/enroll/:courseId", protect, isEnrolled, getEnrolledCourse);

router.delete("/enroll/:courseId", protect, isEnrolled, unEnroll);

export default router;
