import catchAsyncError from "../middlewares/catchAsyncErrors.js";
import Stripe from "stripe";

import dotenv from "dotenv";
// setting up config file
dotenv.config({ path: "backend/config/config.env" });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Process Stripe Payment   =>  /api/v1/payment/process
export const processPayment = catchAsyncError(async (req, res, next) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "usd",
    metadata: { integration_check: "accept_a_payment" },
  });
  res.status(200).json({
    success: true,
    client_secret: paymentIntent.client_secret,
  });
});

// Send Stripe API Key   =>  /api/v1/stripeapi
export const sendStripeApi = catchAsyncError(async (req, res, next) => {
  res.status(200).json({
    sripeApiKey: process.env.STRIPE_API_KEY,
  });
});
