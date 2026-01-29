import Trip from "../../models/Trips.js";

/* CREATE TRIP */
export const createTrip = async (req, res) => {
  const { title, members } = req.body;

  if (!title || !Array.isArray(members)) {
    return res.status(400).json({ message: "Invalid input" });
  }

  const cleanedMembers = members
    .map(m => m?.name?.trim())
    .filter(Boolean)
    .map(name => ({ name }));

  if (cleanedMembers.length === 0) {
    return res.status(400).json({
      message: "At least one member is required",
    });
  }

  const trip = await Trip.create({
    user: req.user._id,
    title: title.trim(),
    members: cleanedMembers,
  });

  res.json(trip);
};

/* GET USER TRIPS */
export const getTrips = async (req, res) => {
  try {
    const trips = await Trip.find({
      user: req.user._id,
      status: "active",
    }).sort({ createdAt: -1 });

    res.json(trips);
  } catch (err) {
    console.error("GET TRIPS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch trips" });
  }
};

/* END TRIP */
import mongoose from "mongoose";

export const endTrip = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid trip id",
    });
  }

  const trip = await Trip.findOne({
    _id: id,
    user: req.user._id,
  });

  if (!trip) {
    return res.status(404).json({
      message: "Trip not found",
    });
  }

  trip.status = "ended";
  trip.endedAt = new Date();
  await trip.save();

  res.json({ success: true });
};
