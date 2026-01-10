import User from "../models/user.js";
import { verifyToken } from "../utils/jwt.js";

export const protect = async (req, res, next) => {
  try {
    /* ---------------- Read token from cookie ---------------- */
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        message: "Not authenticated",
      });
    }

    /* ---------------- Verify token (YOUR util) ---------------- */
    let payload;
    try {
      payload = verifyToken(token);   // ✅ reuse existing logic
    } catch (err) {
      return res.status(401).json({
        message: "Invalid or expired token",
      });
    }

    /* ---------------- Load user ---------------- */
    const user = await User.findById(payload.id).select(
      "-password -resetToken -resetTokenExpiry"
    );

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    if (!user.emailVerified) {
      return res.status(403).json({
        message: "Email not verified",
      });
    }

    /* ---------------- Attach user ---------------- */
    req.user = user;
    next();
  } catch (err) {
    console.error("PROTECT ERROR:", err);
    return res.status(500).json({
      message: "Authentication failed",
    });
  }
};
