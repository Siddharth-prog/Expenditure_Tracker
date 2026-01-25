import PendingExpense from "../../models/PendingExpense.js";

export const getPendingExpenses = async (req, res) => {
  const pending = await PendingExpense.find({
    user: req.user._id,
    status: "pending",
  })
    .sort({ createdAt: -1 })
    .lean();

  res.json(pending);
};
