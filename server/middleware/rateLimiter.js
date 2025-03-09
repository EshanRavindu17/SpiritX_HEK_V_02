import rateLimit from "express-rate-limit";

export const resetLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per window
  message: { message: "Too many reset requests. Try again later." },
});