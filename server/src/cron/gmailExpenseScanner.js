import cron from 'node-cron';
import User from '../models/user.js';
import { syncGmailExpenses } from '../services/gmailExpense.service.js';

cron.schedule('0 */6 * * *', async () => {
  const users = await User.find({ 'gmail.refreshToken': { $exists: true } });
  for (const user of users) {
    try {
      await syncGmailExpenses(user);
    } catch (err) {
      console.error('Gmail sync failed for', user._id, err);
    }
  }
});
