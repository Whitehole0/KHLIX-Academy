import express from "express";
import {
  register,
  login,
  refresh,
  logout,
  logoutAll,
  forgetPassword,
  resetPassword,
} from "../controllers/Auth.controller.js";
import { protect, role } from "../middleware/Auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", protect, logout);
router.post("/logoutAll", protect, logoutAll);
router.get("/me", protect, role("student"), (req, res) =>
  res.json({ success: true, user: req.user }),
);
router.get("/adminCheck", protect, role("admin"), (req, res) =>
  res.json({ success: true }),
);

router.post("/forgetPassword", forgetPassword);
router.post("/resetPasword/:token", resetPassword);

export default router;
