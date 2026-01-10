import express from "express";
import { dashboard } from "../controllers/dashboard/Dashboard.Controller.js";
import { protect } from "../utils/protect.js";

const router = express.Router();

/**
 * GET /api/dashboard?month=YYYY-MM
 */
router.get("/", protect, dashboard);

export default router;
