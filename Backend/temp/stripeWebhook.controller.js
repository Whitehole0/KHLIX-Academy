import { stripe } from "../config/Stripe.js";
import Payment from "./Paymnet.model.js";
import Enroll from "../model/Enroll.model.js";

export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error) {
    console.log("Webhook Error:", error.message);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const payment = await Payment.findOneAndUpdate(
      { stripeSessionId: session.id },
      { status: "paid" },
      { new: true },
    );

    if (payment) {
      const exists = await Enroll.findOne({
        userId: payment.userId,
        courseId: payment.courseId,
      });

      if (!exists) {
        await Enrollment.create({
          userId: payment.userId,
          courseId: payment.courseId,
        });
      }
    }
  }

  res.json({ received: true });
};
