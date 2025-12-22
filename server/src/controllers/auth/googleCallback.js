import { signToken } from "../../utils/jwt";

export const handleGoogleOAuth = async (user) => {
  if (!user.passwordSet) {
    return {
      requiresPassword: true,
      token: signToken({ id: user._id }, "10m"),
    };
  }

  return { requiresPassword: false, userId: user._id };
};