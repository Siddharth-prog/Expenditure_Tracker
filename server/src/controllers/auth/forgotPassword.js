import User from "../../models/user.js";
import { signToken } from "../../utils/jwt.js";
import { sendEmail } from "../../utils/mailer.js";

export const forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) return;

  const token = signToken({ id: user._id }, "10m");

  user.resetToken = token;
  user.resetTokenExpiry = Date.now() + 10 * 60 * 1000;
  await user.save();

  await sendEmail({
    to: email,
    subject: "Reset Password",
    template: "resetPassword.html",
    variables: {
      link: `${env.CLIENT_URL}/reset-password?token=${token}`,
    },
  });
};