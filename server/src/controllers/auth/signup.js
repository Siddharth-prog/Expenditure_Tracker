import User from "../../models/user.model.js";
import { hashPassword, comparePassword } from "../../utils/hash.js";
import { signToken, verifyToken } from "../../utils/jwt.js";
import { sendEmail } from "../../utils/mailer.js";
import { env } from "../../config/env.js";

/* REGISTER */
export const register = async ({ name, email, password }) => {
  if (await User.findOne({ email })) {
    throw new Error("Email already registered");
  }

  const user = await User.create({
    name,
    email,
    password: await hashPassword(password),
    passwordSet: true,
    emailVerified: false,
  });

  const token = signToken({ id: user._id }, "15m");

  await sendEmail({
    to: email,
    subject: "Verify your email",
    template: "verifyEmail.html",
    variables: {
      link: `${env.CLIENT_URL}/verify-email?token=${token}`,
    },
  });
};