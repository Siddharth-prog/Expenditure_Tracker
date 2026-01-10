import { createExpense } from "../../services/expense.service.js";
export const addExpense = async (req, res) => {
  try {
    const expense = await createExpense(req.user._id, req.body);
    return res.status(201).json(expense);
  } catch (err) {
    console.error("ADD EXPENSE ERROR:", err);
    return res.status(500).json({ message: err.message });
  }
};
