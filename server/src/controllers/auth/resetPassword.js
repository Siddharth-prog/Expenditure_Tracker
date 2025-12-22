import User from "../../models/user";
import { verifyToken } from "../../utils/jwt";

export const resetPassword = async (token, password) => {
  const payload = verifyToken(token);

  const user = await User.findOne({
    _id: payload.id,
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() },
  });

  if (!user) throw new Error("Invalid or expired token");

  user.password = await hashPassword(password);
  user.passwordSet = true;
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;

  await user.save();
};