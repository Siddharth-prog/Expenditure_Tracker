import express from "express";
import { protect } from "../utils/protect.js";
import { addExpense } from "../controllers/expenses/addExpenses.js";
import { fetchExpenses } from "../controllers/expenses/getExpenses.js";
import { updateExpense } from "../controllers/expenses/editExpense.js";
import { deleteExpense } from "../controllers/expenses/deleteExpense.js";

const router = express.Router();

router.post("/", protect, addExpense);
router.get("/", protect, fetchExpenses);
router.put("/:id", protect, updateExpense);
router.delete("/:id", protect, deleteExpense);
export default router;
