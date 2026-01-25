import PendingExpense from '../models/PendingExpense.js';

export const savePendingExpense = async (userId, emailId, aiData, rawEmail) => {
  if (!aiData || !aiData.amount) return;

  const exists = await PendingExpense.findOne({
    user: userId,
    emailId,
  });

  if (exists) return;

  return PendingExpense.create({
    user: userId,
    emailId,
    ...aiData,
    rawEmail,
  });
};
