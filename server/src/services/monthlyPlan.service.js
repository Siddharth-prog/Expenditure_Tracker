import MonthlyPlan from "../models/MonthlyPlan.js";
import Expense from "../models/Expense.js";

/* GET PLAN */
export const getMonthlyPlan = async (userId, month) => {
  return MonthlyPlan.findOne({ user: userId, month });
};

/* CREATE / UPDATE */
export const saveMonthlyPlan = async (userId, { month, income, sections }) => {
  return MonthlyPlan.findOneAndUpdate(
    { user: userId, month },
    { income, sections },
    { upsert: true, new: true }
  );
};

/* COPY LAST MONTH */
export const copyLastMonthPlan = async (userId, month) => {
  const [year, m] = month.split("-");
  const prevMonth = `${year}-${String(Number(m) - 1).padStart(2, "0")}`;

  const prevPlan = await MonthlyPlan.findOne({
    user: userId,
    month: prevMonth,
  });

  if (!prevPlan) throw new Error("Previous month not found");

  return MonthlyPlan.create({
    user: userId,
    month,
    income: prevPlan.income,
    sections: prevPlan.sections,
  });
};

/* LOCKED SECTIONS */
export const getLockedSections = async (userId, month) => {
  const expenses = await Expense.find({ user: userId, month });
  return [...new Set(expenses.map((e) => e.section))];
};
