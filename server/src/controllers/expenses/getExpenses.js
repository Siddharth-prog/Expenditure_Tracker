import Expense from "../../models/Expense.js";

export const fetchExpenses = async (req, res) => {
  try {
    const month =
      req.query.month ||
      new Date().toISOString().slice(0, 7);

    const expenses = await Expense.find({
      user: req.user._id,
      month,
    }).sort({ date: -1 });

    res.json(expenses);
  } catch (err) {
    console.error("GET EXPENSES ERROR:", err);
    res.status(500).json({
      message: "Failed to fetch expenses",
    });
  }
};
