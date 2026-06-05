import { stripe } from "../config/Stripe.js";
import Course from "../model/Course.model.js";
import Payment from "./Paymnet.model.js";

export const createCheckoutSession = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user._id;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: course.title,
            },
            unit_amount: course.price * 100,
          },
          quantity: 1,
        },
      ],
      metadata: { userId: userId.toString(), courseId },
      success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,
    });

    await Payment.create({
      userId,
      courseId,
      amount: course.price,
      stripeSessionId: session.id,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
