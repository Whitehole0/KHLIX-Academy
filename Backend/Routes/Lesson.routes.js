import express from "express";
import {
  createLesson,
  deleteLesson,
  getLessonByCourse,
  updateLesson,
} from "../controllers/lesson.controller";

import { protect, adminOnly } from "../Middleware/Auth.middleware";

const router = express.Router;

router.post("/", protect, adminOnly, createLesson);

router.get("/:courseId", protect, getLessonByCourse);
router.put("/:lessonId", protect, adminOnly, updateLesson);
router.delete("/:lessonId", protect, adminOnly, deleteLesson);

export default router;
