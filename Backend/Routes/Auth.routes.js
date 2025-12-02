import express from "express";
import {
  register,
  getMe,
  logout,
  login,
  refreshToken,
} from "../controllers/Auth.controller.js";
import { protect } from "../middleware/Auth.middleware.js";
const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post("/logout", protect, logout);
router.get("/me", protect, getMe);

router.get("/refreshToken", refreshToken);
export default router;

//passport.js
