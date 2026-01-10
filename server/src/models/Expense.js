import mongoose from "mongoose";

export default mongoose.model(
  "Expense",
  new mongoose.Schema(
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      title: String,
      amount: Number,
      section: String,
      category: String,
      date: Date,
      month: String, // derived from date
    },
    { timestamps: true }
  )
);
