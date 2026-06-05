import express from "express";
import { downloadCertificate } from "../controllers/Certificate.controller.js";
import { protect } from "../Middleware/Auth.middleware.js";
import { isEnrolled } from "../Middleware/Role.middleware.js";

const router = express.Router;

router.length("/download/:courseId", protect, isEnrolled, downloadCertificate);

export default router;
