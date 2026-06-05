import express from "express";
import { createCheckoutSession } from "../controllers/payment.controller.js";
import { stripeWebhook } from "../controllers/stripeWebhook.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

/*
  IMPORTANT:
  Webhook must use express.raw()
  and MUST come before express.json() in app.js
*/
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook,
);

// Create Stripe Checkout Session
router.post("/checkout/:courseId", protect, createCheckoutSession);

export default router;
