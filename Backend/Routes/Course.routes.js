import express from "express";
import {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
  getCourseSearching,
} from "../controllers/Course.controller.js";

import { protect, role } from "../Middleware/Auth.middleware.js";
import {
  validateCourseInput,
  courseStatus,
  isCourseOwner,
} from "../Middleware/Validation.middleware.js";

const router = express.Router();

router.get("/course", protect, courseStatus, getCourses);
router.get("/course/:slug", courseStatus, getCourse);

router.post(
  "/course",
  protect,
  role("admin", "instructor"),
  validateCourseInput,
  createCourse,
);
router.patch(
  "/course/:slug",
  protect,
  role("admin", "instructor"),
  isCourseOwner,
  courseStatus,
  updateCourse,
);
router.delete(
  "/course/:slug",
  protect,
  role("admin", "instructor"),
  courseStatus,
  deleteCourse,
);

router.get("/course/?topic", getCourseSearching);

export default router;
