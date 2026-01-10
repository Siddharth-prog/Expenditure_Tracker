import User from "../../models/user.js";
import { hashPassword } from "../../utils/hash.js";
import { verifyToken } from "../../utils/jwt.js";

export const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({
        message: "Token and new password are required",
      });
    }

    const payload = verifyToken(token);

    const user = await User.findOne({
      _id: payload.id,
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid or expired reset token",
      });
    }

    user.password = await hashPassword(password);
    user.passwordSet = true;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    return res.status(200).json({
      message: "Password reset successful",
    });
  } catch (err) {
    console.error("RESET PASSWORD ERROR:", err);
    return res.status(401).json({
      message: "Invalid or expired reset token",
    });
  }
};
