import express from "express";
import {
  register,
  getMe,
  logout,
  login,
  refreshTokenController,
} from "../controllers/Auth.controller.js";
import { protect } from "../middleware/Auth.middleware.js";
const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post("/logout", protect, logout);
router.get("/me", protect, getMe);

router.get("/refreshToken", refreshTokenController);
export default router;

//passport.js
