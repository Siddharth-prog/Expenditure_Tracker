import { signToken } from "../../utils/jwt.js";

/**
 * Pure helper – NOT an Express controller
 */
export const handleGoogleOAuth = async (user) => {
  if (!user) {
    throw new Error("OAuth user missing");
  }

  if (!user.passwordSet) {
    return {
      requiresPassword: true,
      token: signToken({ id: user._id }, "10m"),
    };
  }

  return {
    requiresPassword: false,
    userId: user._id,
  };
};
