import express from "express";
import { protect } from "../utils/protect.js";
import {
  fetchMonthlyPlan,
  upsertMonthlyPlan,
  copyLastMonth,
  fetchLockedSections,
} from "../controllers/expenses/monthlyPlan.control.js";

const router = express.Router();

router.get("/", protect, fetchMonthlyPlan);
router.post("/", protect, upsertMonthlyPlan);
router.post("/copy", protect, copyLastMonth);
router.get("/locked", protect, fetchLockedSections);

export default router;
