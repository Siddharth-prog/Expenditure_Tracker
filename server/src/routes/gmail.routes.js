import express from "express";
import { google } from "googleapis";
import User from "../models/user.js";
import { protect } from "../utils/protect.js";

const router = express.Router();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_GMAIL_CLIENT_ID,
  process.env.GOOGLE_GMAIL_CLIENT_SECRET,
  `${process.env.SERVER_URL}/api/gmail/callback`
);

/* ===========================
   START GMAIL OAUTH
=========================== */
router.get("/connect", protect, (req, res) => {
  if (req.user.gmail?.connectedAt) {
    return res.redirect(
      `${process.env.CLIENT_URL}/dashboard?gmail=already_connected`
    );
  }

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent", // ONLY first time refresh token
    scope: ["https://www.googleapis.com/auth/gmail.readonly"],
    state: req.user._id.toString(),
  });

  res.redirect(url);
});

/* ===========================
   OAUTH CALLBACK
=========================== */
router.get("/callback", async (req, res) => {
  try {
    const { code, state } = req.query;

    if (!code || !state) {
      return res.redirect(
        `${process.env.CLIENT_URL}/dashboard?gmail=failed`
      );
    }

    const user = await User.findById(state);
    if (!user) {
      return res.redirect(
        `${process.env.CLIENT_URL}/dashboard?gmail=failed`
      );
    }

    const { tokens } = await oauth2Client.getToken(code);

    user.gmail = {
      accessToken: tokens.access_token,
      refreshToken:tokens.refresh_token || user.gmail?.refreshToken,
      connected:true,
      lastFetchedAt: user.gmail?.lastFetchedAt || null,
    };

    await user.save();

    res.redirect(
      `${process.env.CLIENT_URL}/dashboard?gmail=connected`
    );
  } catch (err) {
    console.error("GMAIL OAUTH ERROR:", err);
    res.redirect(
      `${process.env.CLIENT_URL}/dashboard?gmail=failed`
    );
  }
});

export default router;
