import express from "express";
import { generateUploadSignature } from "../controllers/upload.controller.js";
import { protect, role } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signature", protect, role("admin"), generateUploadSignature);

export default router;
