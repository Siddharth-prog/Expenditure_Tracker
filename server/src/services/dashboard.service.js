 import MonthlyPlan from "../models/MonthlyPlan.js";
import Expense from "../models/Expense.js";
import User from "../models/user.js";

export const getDashboardData = async (userId, month) => {
  if (!userId || !month) {
    throw new Error("userId and month are required");
  }

  const [user, plan, expenses] = await Promise.all([
    User.findById(userId)
      .select("name email gmail")
      .lean(),

    MonthlyPlan.findOne({ user: userId, month }).lean(),

    Expense.find({ user: userId, month }).lean(),
  ]);

  if (!user) {
    throw new Error("User not found");
  }

  /* ---------- SAFE MONTHLY PLAN ---------- */
  const safePlan = plan ?? {
    income: 0,
    sections: [],
  };

  /* ---------- AGGREGATE EXPENSES ---------- */
  const spentBySection = {};
  let totalSpent = 0;

  for (const e of expenses) {
    const section = e.section || "Uncategorized";
    spentBySection[section] =
      (spentBySection[section] || 0) + e.amount;
    totalSpent += e.amount;
  }

  /* ---------- PIE DATA ---------- */
  const pieBySection = Object.values(
    expenses.reduce((acc, e) => {
      const section = e.section || "Uncategorized";
      acc[section] ??= { name: section, value: 0 };
      acc[section].value += e.amount;
      return acc;
    }, {})
  );

  return {
    user: {
      name: user.name,
      email: user.email,
      gmail: user.gmail ?? { connected: false },
      plan: "Pro",
    },

    overview: {
      income: safePlan.income,
      totalSpent,
      savings: safePlan.income - totalSpent,
    },

    monthlyPlan: {
      income: safePlan.income,
      sections: safePlan.sections.map((sec) => ({
        section: sec.section,
        limit: sec.limit,
        spent: spentBySection[sec.section] || 0,
      })),
    },

    pie: {
      bySection: pieBySection,
    },
  };
};
