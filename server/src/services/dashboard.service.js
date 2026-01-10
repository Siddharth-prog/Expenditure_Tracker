import MonthlyPlan from "../models/MonthlyPlan.js";
import Expense from "../models/Expense.js";
import User from "../models/user.js";

export const getDashboardData = async (userId, month) => {
  if (!userId || !month) {
    throw new Error("userId and month are required");
  }

  const [user, plan, expenses] = await Promise.all([
    User.findById(userId)
      .select("name email")
      .lean(),

    MonthlyPlan.findOne({ user: userId, month }).lean(),

    Expense.find({ user: userId, month }).lean(),
  ]);

  if (!user) {
    throw new Error("User not found");
  }

  /* -------- Aggregate expenses -------- */
  const spentBySection = {};
  for (const e of expenses) {
    spentBySection[e.section] =
      (spentBySection[e.section] || 0) + e.amount;
  }

  const totalSpent = expenses.reduce(
    (s, e) => s + e.amount,
    0
  );

  const totalBudget =
    plan?.sections?.reduce(
      (s, sec) => s + sec.limit,
      0
    ) || 0;

  return {
    user: {
      name: user.name,
      email: user.email,
      plan: "Pro", // static for now
    },

    overview: {
      totalSpent,
      totalBudget,
      savings: totalBudget - totalSpent,
    },

    pie: {
      bySection: (plan?.sections || []).map((sec) => ({
        name: sec.section,
        value: spentBySection[sec.section] || 0,
      })),
    },

    monthlyPlan: {
      sections: (plan?.sections || []).map((sec) => ({
        section: sec.section,
        limit: sec.limit,
        spent: spentBySection[sec.section] || 0,
      })),
    },
  };
};
