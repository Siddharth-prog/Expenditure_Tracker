import express from "express";
import { protect } from "../utils/protect.js";

import {
  createTrip,
  getTrips,
  endTrip,
} from "../controllers/trip/trip.controller.js";

import {
  addTripExpense,
  getTripById,
  getTripExpenses,
} from "../controllers/trip/tripExpense.controller.js";

import { getTripSummary } from "../controllers/trip/tripSummary.controller.js";
import { addTripMember } from "../controllers/trip/addmembers.js";

const router = express.Router();

router.post("/", protect, createTrip);
router.get("/", protect, getTrips);
router.post("/:id/end", protect, endTrip);
router.get("/:id", protect, getTripById) ;
router.post("/:tripId/expenses", protect, addTripExpense);
router.get("/:tripId/expenses", protect, getTripExpenses);
router.get("/:id/summary", protect, getTripSummary);
router.post("/:id/members", protect, addTripMember);
export default router;
