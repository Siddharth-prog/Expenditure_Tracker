import Expense from "../../models/Expense.js";

export const getMonthlyAnalytics = async (req, res) => {
  const userId = req.user._id;
  const month = req.query.month;

  if (!month) {
    return res.status(400).json({ message: "month is required" });
  }

  const data = await Expense.aggregate([
    {
      $match: {
        user: userId,
        month,
      },
    },
    {
      $group: {
        _id: {
          $ceil: { $divide: [{ $dayOfMonth: "$date" }, 7] },
        },
        spent: { $sum: "$amount" },
      },
    },
    { $sort: { "_id": 1 } },
  ]);

  const result = data.map((d) => ({
    week: `Week ${d._id}`,
    spent: d.spent,
  }));

  res.json(result);
};
