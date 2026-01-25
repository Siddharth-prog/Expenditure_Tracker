import express from "express";
import { protect } from "../utils/protect.js";
import { getDailyAnalytics } from "../controllers/analytics/dailyAnalytics.js";
import { getMonthlyAnalytics } from "../controllers/analytics/monthlyAnalytics.js";
import { getYearlyAnalytics } from "../controllers/analytics/yearlyAnalytics.js";

const router = express.Router();

router.get("/daily", protect, getDailyAnalytics);
router.get("/monthly", protect, getMonthlyAnalytics);
router.get("/yearly", protect, getYearlyAnalytics);

export default router;
