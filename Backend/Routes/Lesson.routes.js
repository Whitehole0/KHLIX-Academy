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
  getLessonByCourse,
  getLessonById,
  updateLesson,
  deleteOne,
  saveVideo,
} from "../controllers/lesson.controller.js";
import { protect, role } from "../Middleware/Auth.middleware.js";
import { isEnrolled } from "../Middleware/Role.middleware.js";
import { lessonPublishedOnly } from "../Middleware/Validation.middleware.js";
const router = express.Router();

// Instructor/Admin
router.post("/course/:courseId", protect, role("admin"), createLesson);
router.patch("/:lessonId", protect, role("admin"), updateLesson);
router.delete("/:lessonId", protect, role("admin"), deleteOne);

// Student
router.get(
  "/course/:courseId",
  protect,
  isEnrolled,
  lessonPublishedOnly,
  getLessonByCourse,
);
router.get(
  "/:lessonId",
  protect,
  isEnrolled,
  lessonPublishedOnly,
  getLessonById,
);

router.post("/course/:courseId/lesson/:lessonId/media", saveVideo);

export default router;
