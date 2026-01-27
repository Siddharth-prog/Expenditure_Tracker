import TripExpense from "../../models/TripExpense.js";
import Trip from "../../models/Trips.js";

/* ADD EXPENSE */
export const addTripExpense = async (req, res) => {
  const { title, amount, paidBy, splitBetween, category } = req.body;
  const tripId = req.params.tripId;

  const trip = await Trip.findById(tripId);
  if (!trip || trip.status !== "active") {
    return res.status(400).json({ message: "Trip not active" });
  }

  const memberNames = trip.members.map(m => m.name);

  // ✅ VALIDATE paidBy
  if (!memberNames.includes(paidBy)) {
    return res.status(400).json({
      message: "paidBy must be a trip member",
    });
  }

  // ✅ VALIDATE splitBetween
  const invalid = splitBetween.filter(
    m => !memberNames.includes(m)
  );

  if (invalid.length > 0) {
    return res.status(400).json({
      message: "splitBetween contains invalid members",
      invalid,
    });
  }

  const expense = await TripExpense.create({
    trip: tripId,
    title,
    amount,
    paidBy,
    splitBetween,
    category,
  });

  res.json(expense);
};


/* GET TRIP EXPENSES */
export const getTripExpenses = async (req, res) => {
  const expenses = await TripExpense.find({
    trip: req.params.tripId,
  });

  res.json(expenses);
};


export const getTripById = async (req, res) => {
  const trip = await Trip.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!trip) return res.sendStatus(404);
  res.json(trip);
};
