// src/controllers/expenses/deleteExpense.js
import Expense from "../../models/Expense.js";

export const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    if (expense.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not allowed to delete this expense",
      });
    }

    await expense.deleteOne();

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("DELETE EXPENSE ERROR:", err);
    res.status(500).json({ message: "Failed to delete expense" });
  }
};
