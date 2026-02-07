import express from "express";
import { upload } from "../config/cloudninary";
import { uploadFile } from "../controllers/upload.controller";
import { protect, role } from "../Middleware/Auth.middleware";

const router = express.Router();

router.post("/", protect, role, upload.single("file"), uploadFile);

export default router;
