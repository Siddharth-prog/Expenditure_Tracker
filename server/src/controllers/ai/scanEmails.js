import {
  getGmailClient,
  fetchRecentEmails,
  fetchEmailText,
  fetchAttachments,
  downloadAttachment,
} from '../../services/gmail.services.js';
import { extractPdfText } from '../../services/pdfExtractor.js';
import { extractExpense } from '../../services/geminiExpenseExtractor.js';
import { savePendingExpense } from '../../services/aiExpense.service.js';
import PendingExpense from '../../models/PendingExpense.js';
import User from '../../models/user.js';
import { looksLikeExpense, hasAmount } from '../../services/expenseHeuristics.js';

export const scanEmails = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user?.gmail?.connected) {
      return res.status(400).json({ message: "Gmail not connected" });
    }

    const gmail = await getGmailClient(user);
    const lastScan = user.ai?.lastEmailScanAt || null;

    const emails = await fetchRecentEmails(gmail, lastScan);
    let added = 0;

    for (const e of emails) {
      try {
        // 🔒 duplicate protection
        const exists = await PendingExpense.findOne({
          user: user._id,
          emailId: e.id,
        });
        if (exists) continue;

        const msg = await gmail.users.messages.get({
          userId: "me",
          id: e.id,
          format: "full",
        });

        if (!msg?.data?.payload) continue;

        let extractedText = "";

        // 📄 1. PDF FIRST (CRITICAL)
        const attachments = fetchAttachments(msg.data.payload) || [];

        for (const a of attachments) {
          if (!a.filename?.toLowerCase().endsWith(".pdf")) continue;

          try {
            const buffer = await downloadAttachment(
              gmail,
              e.id,
              a.attachmentId
            );

            const pdfText = await extractPdfText(buffer);
            if (pdfText && pdfText.length > extractedText.length) {
              extractedText = pdfText;
            }
          } catch (err) {
            console.error("PDF parse failed:", a.filename, err);
          }
        }

        // 📧 2. fallback to email body
        if (!extractedText) {
          extractedText = await fetchEmailText(gmail, e.id);
        }

        if (!extractedText) continue;

        // 🧠 3. cheap heuristics
        if (!looksLikeExpense(extractedText)) {
          console.log("❌ skipped: not expense");
          continue;
        }

        if (!hasAmount(extractedText)) {
          console.log("❌ skipped: no amount");
          continue;
        }

        // 🤖 4. AI ONLY ONCE
        const ai = await extractExpense(extractedText);
        if (!ai || !ai.amount) {
          console.log("❌ skipped: AI no amount");
          continue;
        }

        await savePendingExpense(
          user._id,
          e.id,
          ai,
          extractedText
        );

        added++;
      } catch (err) {
        console.error("Email processing failed", e.id, err);
      }
    }

    await User.findByIdAndUpdate(user._id, {
      "ai.lastEmailScanAt": new Date(),
    });

    return res.json({
      scanned: emails.length,
      added,
      skipped: emails.length - added,
    });
  } catch (err) {
    console.error("SCAN EMAILS FATAL ERROR:", err);
    return res.status(500).json({ message: "Email scan failed" });
  }
};
