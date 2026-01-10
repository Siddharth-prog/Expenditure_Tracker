import express from "express";
import { protect } from "../utils/protect.js";
import { addExpense } from "../controllers/expenses/addExpenses.js";
import { fetchExpenses } from "../controllers/expenses/getExpenses.js";

const router = express.Router();

router.post("/", protect, addExpense);
router.get("/", protect, fetchExpenses);
export default router;
