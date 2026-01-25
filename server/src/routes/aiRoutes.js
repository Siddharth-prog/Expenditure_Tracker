import { getPendingExpenses } from "../controllers/ai/pendingRequests.js";
import { rejectExpense } from "../controllers/ai/rejectPendingRequests.js";
import { scanEmails } from "../controllers/ai/scanEmails.js";
import { approveExpense } from "../controllers/ai/approveAiExpense.js";
import { protect } from "../utils/protect.js";
import { Router } from "express";

const router = Router() ;
router.post("/scan", protect, scanEmails);
router.get("/pending", protect, getPendingExpenses);
router.post("/:id/approve", protect, approveExpense);
router.post("/:id/reject", protect, rejectExpense);

export default router ;
