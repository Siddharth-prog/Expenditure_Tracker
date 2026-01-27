import TripExpense from "../../models/TripExpense.js";
import { calculateSplit, settleBalances } from "../../services/tripSplit.service.js";

export const getTripSummary = async (req, res) => {
  const expenses = await TripExpense.find({
    trip: req.params.tripId,
  });

  const members = [
    ...new Set(expenses.flatMap(e => [e.paidBy, ...e.splitBetween]))
  ];

  const balances = calculateSplit(expenses, members);
  const settlements = settleBalances(balances);

  res.json({
    balances,
    settlements,
  });
};
