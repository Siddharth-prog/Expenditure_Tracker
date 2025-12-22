import User from "../../models/user";
import { verifyToken } from "../../utils/jwt";

export const verifyEmail = async (token) => {
  const payload = verifyToken(token);
  await User.findByIdAndUpdate(payload.id, { emailVerified: true });
};