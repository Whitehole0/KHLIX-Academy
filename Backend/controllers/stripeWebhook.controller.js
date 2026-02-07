import { stripe } from "../config/Stripe.js";
import Payment from "../models/Payment.js";
import Enrollment from "../models/Enrollment.js";

export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, something);
  } catch (error) {
    console.log(error);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const payment = await Payment.findOneAndUpdate(
      { stripesessionId: session.id },
      { status: "paid" },
      { new: true },
    );

    if (payment) {
      const exists = await Enrollment.findOne({
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
