import express from "express";
import {
  enrollStudent,
  getEnrolledCourses,
  getEnrolledCourse,
  unEnroll,
} from "../controllers/Enroll.controller.js";

// Middlewares (assume you have these)
import { protect, role } from "../middleware/Auth.middleware.js";

const router = express.Router();

// POST /api/enroll/:courseId -> enroll in a course
// router.post("/:courseId", protect, role("student"), enrollStudent);

// GET /api/enroll -> get all courses the student is enrolled in
router.get("/", protect, getEnrolledCourses);

// GET /api/enroll/:courseId -> get specific enrollment info
router.get("/:courseId", protect, getEnrolledCourse);

// DELETE /api/enroll/:courseId -> unenroll from a course
router.delete("/:courseId", protect, unEnroll);

export default router;
