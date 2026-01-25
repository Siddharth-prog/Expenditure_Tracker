import Expense from "../models/Expense.js";
import MonthlyPlan from "../models/MonthlyPlan.js";

export const createExpense = async (userId, data) => {
  try {
    const { title, amount, section, category, date } = data;

    if (!title || !amount || !section || !date) {
      throw new Error("Missing required fields");
    }

    const expenseDate = new Date(date);
    const month = expenseDate.toISOString().slice(0, 7);

    // ✅ CREATE EXPENSE (THIS WAS BROKEN BEFORE)
    const expense = await Expense.create({
      user: userId,
      title,
      amount,
      category: category || "Other",
      section,
      date: expenseDate,
      month, // ✅ REQUIRED
    });

    // ✅ OPTIONAL: Sync with monthly plan
    const plan = await MonthlyPlan.findOne({ user: userId, month });

    if (plan) {
      const sec = plan.sections.find(
        (s) => s.section === section
      );

      if (!sec) {
        plan.sections.push({
          section,
          limit: 0,
        });
        await plan.save();
      }
    }

    return expense;
  } catch (err) {
    console.error("CREATE EXPENSE ERROR:", err);
    throw err;
  }
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
