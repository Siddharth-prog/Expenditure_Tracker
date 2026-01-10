import User from "../../models/user.js";
import { signToken } from "../../utils/jwt.js";
import { sendEmail } from "../../utils/mailer.js";
import { env } from "../../config/env.js";

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(200).json({
        message:
          "If the email exists, a password reset link has been sent",
      });
    }

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

    return res.status(200).json({
      message:
        "If the email exists, a password reset link has been sent",
    });
  } catch (err) {
    console.error("FORGOT PASSWORD ERROR:", err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
