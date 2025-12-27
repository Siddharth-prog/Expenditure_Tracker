import User from "../../models/user.js";
import { hashPassword } from "../../utils/hash.js";
import { verifyToken } from "../../utils/jwt.js";

export const setPasswordOauth = async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({
        message: "Token and password are required",
      });
    }

    const payload = verifyToken(token);

    const user = await User.findById(payload.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.password = await hashPassword(password);
    user.passwordSet = true;

    await user.save();

    return res.status(200).json({
      message: "Password set successfully",
    });
  } catch (err) {
    console.error("SET PASSWORD OAUTH ERROR:", err);

    return res.status(400).json({
      message: "Invalid or expired token",
    });
  }
};
