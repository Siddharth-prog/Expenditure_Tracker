// src/controllers/gmail.controller.js
import { google } from 'googleapis';

export const connectGmail = (req, res) => {
  if (req.user.gmail?.connected) {
    return res.status(400).json({ message: 'Gmail already connected' });
  }

  const oauth2 = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  const authUrl = oauth2.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/gmail.readonly'],
    prompt: 'consent',
  });

  res.json({ authUrl });
};

export const gmailCallback = async (req, res) => {
  const oauth2 = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  const { tokens } = await oauth2.getToken(req.query.code);

  req.user.gmail = {
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token,
    connected: true,
    lastCheckedAt: new Date(),
  };

  await req.user.save();
  res.redirect('/dashboard?gmail=connected');
};
