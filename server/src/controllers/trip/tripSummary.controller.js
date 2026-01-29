import Trips from "../../models/Trips.js";
import TripExpense from "../../models/TripExpense.js";
import { calculateNetBalances } from "../../services/tripSettlement.services.js";

export const getTripSummary = async (req, res) => {
  try {
    const { id } = req.params;

    const trip = await Trips.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    const expenses = await TripExpense.find({ trip: id });

    const balances = calculateNetBalances(trip, expenses);

    res.json({
      balances,
    });
  } catch (err) {
    console.error("TRIP SUMMARY ERROR:", err);
    res.status(500).json({ message: "Failed to load summary" });
  }
};
