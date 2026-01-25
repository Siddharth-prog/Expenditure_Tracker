import PendingExpense from "../../models/PendingExpense.js";
import { createExpense } from "../../services/expense.service.js";

export const approveExpense = async (req, res) => {
  try {
    const p = await PendingExpense.findOne({
      _id: req.params.id,
      user: req.user._id,
      status: "pending",
    });

    if (!p) return res.status(404).json({ message: "Not found" });

    // 🔴 DERIVE MONTH CORRECTLY
    const date = p.date ? new Date(p.date) : new Date();
    const month = date.toISOString().slice(0, 7);

    const expense = await createExpense(req.user._id, {
      title: p.title || "Imported expense",
      amount: p.amount,
      category: p.category || "Other",
      section: p.section || "Essentials",
      date,
      month, 
    });

    if (!expense) {
      throw new Error("Expense creation failed");
    }

    p.status = "approved";
    await p.save();

    res.json({ success: true, expenseId: expense._id });
  } catch (err) {
    console.error("APPROVE EXPENSE ERROR:", err);
    res.status(500).json({ message: "Approve failed" });
  }
};
