// src/controllers/expenses/updateExpense.js
import Expense from "../../models/Expense.js";

export const updateExpense = async (req, res) => {
  try {
    console.log("UPDATE PARAMS:", req.params);
    console.log("UPDATE BODY:", req.body);
    console.log("USER:", req.user?._id);

    const expense = await Expense.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id, // 🔐 ownership
      },
      req.body.data,
      { new: true, runValidators: true }
    );

    if (!expense) {
      console.log("❌ EXPENSE NOT FOUND");
      return res.status(404).json({ message: "Expense not found" });
    }

    console.log("✅ UPDATED EXPENSE:", expense);
    res.json(expense);
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
