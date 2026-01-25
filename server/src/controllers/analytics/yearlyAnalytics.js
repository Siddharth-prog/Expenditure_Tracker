import Expense from "../../models/Expense.js";

export const getYearlyAnalytics = async (req, res) => {
  const userId = req.user._id;
  const year = req.query.year; // YYYY

  if (!year) {
    return res.status(400).json({ message: "year is required" });
  }

  const data = await Expense.aggregate([
    {
      $match: {
        user: userId,
        month: { $regex: `^${year}` },
      },
    },
    {
      $group: {
        _id: "$month",
        spent: { $sum: "$amount" },
      },
    },
    { $sort: { "_id": 1 } },
  ]);

  const result = data.map((d) => ({
    month: d._id.split("-")[1],
    spent: d.spent,
  }));

  res.json(result);
};
