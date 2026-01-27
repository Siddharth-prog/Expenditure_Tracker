import Trip from "../../models/Trips.js";

export const addTripMember = async (req, res) => {
  const { name } = req.body;

  if (!name?.trim()) {
    return res.status(400).json({ message: "Name required" });
  }

  const trip = await Trip.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!trip) return res.sendStatus(404);

  const exists = trip.members.some(
    (m) => m.name.toLowerCase() === name.toLowerCase()
  );

  if (exists) {
    return res
      .status(409)
      .json({ message: "Member already exists" });
  }

  trip.members.push({ name });
  await trip.save();

  res.json(trip);
};
