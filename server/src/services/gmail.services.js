import { google } from 'googleapis';

export const getGmailClient = async (user) => {
  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_GMAIL_CLIENT_ID,
    process.env.GOOGLE_GMAIL_CLIENT_SECRET
  );

  auth.setCredentials({
    access_token: user.gmail.accessToken,
    refresh_token: user.gmail.refreshToken,
  });

  return google.gmail({ version: 'v1', auth });
};

export const fetchRecentEmails = async (gmail, afterDate) => {
  let q = `
  has:attachment
  (
    filename:pdf
    OR invoice
    OR receipt
    OR bill
    OR payment
    OR order
    OR statement
  )
`;

  if (afterDate) {
    q += ` after:${Math.floor(afterDate.getTime() / 1000)}`;
  }

  const res = await gmail.users.messages.list({
    userId: 'me',
    q: q.replace(/\s+/g, ' ').trim(),
    maxResults: 50,
  });

  return res.data.messages || [];
};

export const fetchEmailText = async (gmail, id) => {
  const msg = await gmail.users.messages.get({
    userId: 'me',
    id,
    format: 'full',
  });

  const extract = (p) =>
    p?.body?.data
      ? Buffer.from(p.body.data, 'base64').toString('utf8')
      : p?.parts?.map(extract).join(' ') || '';

  return extract(msg.data.payload).replace(/<[^>]+>/g, ' ');
};

export const fetchAttachments = (payload) => {
  const files = [];
  const walk = (parts = []) => {
    for (const p of parts) {
      if (p.filename && p.body?.attachmentId) {
        files.push({
          filename: p.filename,
          attachmentId: p.body.attachmentId,
        });
      }
      if (p.parts) walk(p.parts);
    }
  };
  walk(payload.parts);
  return files;
};

export const downloadAttachment = async (gmail, msgId, attachmentId) => {
  const res = await gmail.users.messages.attachments.get({
    userId: 'me',
    messageId: msgId,
    id: attachmentId,
  });
  return Buffer.from(res.data.data, 'base64');
};
