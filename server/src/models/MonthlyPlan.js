import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
  section: String,
  limit: Number,
});

export default mongoose.model(
  "MonthlyPlan",
  new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    month: String,          // "2025-01"
    income: Number,
    sections: [sectionSchema],
  })
);
