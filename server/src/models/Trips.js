import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  members: [
    {
      name: { type: String, required: true },
      email: String,
    },
  ],

  status: {
    type: String,
    enum: ["active", "ended"],
    default: "active",
  },

  endedAt: Date,
}, { timestamps: true });

export default mongoose.model("Trip", tripSchema);
