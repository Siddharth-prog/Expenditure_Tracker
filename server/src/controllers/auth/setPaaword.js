import User from "../../models/user.js";
import { hashPassword } from "../../utils/hash.js";
import { verifyToken } from "../../utils/jwt.js";

export const setPasswordOauth = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);

    const { token, password } = req.body;

    const payload = verifyToken(token);
    console.log("JWT PAYLOAD:", payload);

    const user = await User.findById(payload.id);
    console.log("USER FOUND:", user?._id);

    user.password = await hashPassword(password);
    user.passwordSet = true;

    await user.save();

    return res.status(200).json({ message: "Password set" });
  } catch (err) {
    console.error("SET PASSWORD ERROR:", err.message);
    return res.status(400).json({ message: "Invalid or expired token" });
  }
};
