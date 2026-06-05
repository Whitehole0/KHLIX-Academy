import express from "express";
import {
  courseProgress,
  markLessonComplete,
} from "../controllers/progress.controller";
import { protect } from "../Middleware/Auth.middleware.js";

const router = express.Router();

router.post("/complete", protect, markLessonComplete);
router.post("/courseId", protect, courseProgress);

export default router;
