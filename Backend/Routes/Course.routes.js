import express from "express";
import {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/Course.controller";

import { protect, adminOnly } from "../Middleware/Auth.middleware";
import { validateCourseInput } from "../Middleware/Validation.middleware";

const router = express.Router();

router.get("/", getCourses);
router.get("/:slug", getCourse);

router.post("/", protect, adminOnly, validateCourseInput, createCourse);
router.post("/:slug", protect, adminOnly, updateCourse);
router.post("/:slug", protect, adminOnly, deleteCourse);

export default router;
