import mongoose from "mongoose";

const pendingExpenseSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    source: {
      type: String,
      enum: ["email"],
      default: "email",
    },

    emailId: String,

    title: String,
    amount: Number,
    currency: { type: String, default: "INR" },
    date: Date,

    category: String,
    section: String,

    confidence: Number, // 0 → 1

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    rawEmail: String, // for audit/debug
  },
  { timestamps: true 

  });

  export default mongoose.model("PendingExpense", pendingExpenseSchema) ;