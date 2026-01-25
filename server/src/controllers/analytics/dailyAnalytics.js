import Expense from "../../models/Expense.js";

export const getDailyAnalytics = async (req, res) => {
  const userId = req.user._id;
  const month = req.query.month; // YYYY-MM

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
        _id: { $dayOfMonth: "$date" },
        spent: { $sum: "$amount" },
      },
    },
    { $sort: { "_id": 1 } },
  ]);

  const result = data.map((d) => ({
    day: `Day ${d._id}`,
    spent: d.spent,
  }));

  res.json(result);
};
