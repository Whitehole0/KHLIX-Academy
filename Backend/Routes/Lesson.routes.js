// import express from "express";
// import {
//   createLesson,
//   deleteLesson,
//   getLessonByCourse,
//   updateLesson,
// } from "../controllers/lesson.controller";

// import { protect, adminOnly } from "../Middleware/Auth.middleware";

// const router = express.Router;

// router.post("/", protect, adminOnly, createLesson);

// router.get("/:courseId", protect, getLessonByCourse);
// router.put("/:lessonId", protect, adminOnly, updateLesson);
// router.delete("/:lessonId", protect, adminOnly, deleteLesson);

// export default router;

import express from "express";
import {
  createLesson,
  getLessonsByCourse,
  getLessonById,
  updateLesson,
  deleteLesson,
} from "../controllers/lesson.controller.js";
import { protect, role } from "../Middleware/Auth.middleware";
import { requireEnrollment } from "../Middleware/Role.middleware.js";
const router = express.Router();

// Instructor/Admin
router.post("/course/:courseId", protect, role("admin"), createLesson);
router.put("/:lessonId", protect, role("admin"), updateLesson);
router.delete("/:lessonId", protect, role("admin"), deleteLesson);

// Student
router.get("/course/:courseId", protect, requireEnrollment, getLessonsByCourse);
router.get("/:lessonId", protect, getLessonById);

export default router;
