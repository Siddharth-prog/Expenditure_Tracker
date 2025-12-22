import User from "../../models/user";
import { hashPassword } from "../../utils/hash";
import { verifyToken } from "../../utils/jwt";

export const setPasswordOauth = async (token, password) => {
  const payload = verifyToken(token);
  const user = await User.findById(payload.id);

  user.password = await hashPassword(password);
  user.passwordSet = true;
  await user.save();
};