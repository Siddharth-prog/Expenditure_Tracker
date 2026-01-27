import mongoose from "mongoose";

const tripExpenseSchema = new mongoose.Schema({
  trip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trip",
    required: true,
  },

  title: String,
  amount: Number,

  paidBy: String,               // member name
  splitBetween: [String],       // member names

  category: String,
}, { timestamps: true });

export default mongoose.model("TripExpense", tripExpenseSchema);
