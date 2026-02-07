import stripe from "../config/Stripe.js";
import Course from "../model/Course.js";
import Payment from "../model/Paymnet.model.js";

export const createCheckoutSession = async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user._id;

  const course = await Course.findById(courseId);

  if (!course) {
  }

  const session = await stripe.chekout.sessions.create({
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
    metadata: { userId, courseId },
    success_url: "write the correct url for the folowing okay ",
    cancel_url: "write the correct url for the folowing okay ",
  });

  await Payment.create({
    userId,
    courseId,
    amount: course.price,
    stripeSessionId: session._id,
  });

  res.json({ url: session.url });
};
