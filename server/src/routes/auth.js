import { Router } from "express";
import passport from "passport";
import { register } from "../controllers/auth/signup";
import { login} from "../controllers/auth/login";
import { verifyEmailToken } from "../controllers/auth/verifyEmail";
import { forgotPassword } from "../controllers/auth/forgotPassword";
import { resetPassword } from "../controllers/auth/resetPassword";
import { setPasswordOauth } from "../controllers/auth/setPaaword";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/verify-email", verifyEmailToken);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

router.post("/set-password", setPasswordOauth);

router.get("/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/google/callback",
  passport.authenticate("google", { session: false }),
  googleCallback
);

export default router;
