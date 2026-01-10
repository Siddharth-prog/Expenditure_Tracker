import Expense from "../models/Expense.js";
import MonthlyPlan from "../models/MonthlyPlan.js";

export const createExpense = async (userId, data) => {
  const { title, amount, section, category, date } = data;

  if (!title || !amount || !section || !date) {
    throw new Error("Missing required fields");
  }

  const month = new Date(date).toISOString().slice(0, 7);

  // ✅ Always create expense first
  const expense = await Expense.create({
    user: userId,
    title,
    amount,
    section,
    category,
    date,
    month,
  });

  // ✅ Monthly plan is OPTIONAL
  const plan = await MonthlyPlan.findOne({ user: userId, month });

  if (plan) {
    const sec = plan.sections.find(
      (s) => s.section === section
    );

    // Optional auto-create section inside plan
    if (!sec) {
      plan.sections.push({
        section,
        limit: 0,
      });
    }

    await plan.save();
  }

  return expense;
};

export const getExpenses = async (userId, month) => {
  if (!userId || !month) {
    throw new Error("userId and month are required");
  }

  return Expense.find({
    user: userId,
    month,
  }).sort({ date: -1 });
};