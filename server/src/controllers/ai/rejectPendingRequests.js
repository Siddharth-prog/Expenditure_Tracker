import PendingExpense from "../../models/PendingExpense.js";

export const rejectExpense = async (req, res) => {
  const exp = await PendingExpense.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!exp) {
    return res.status(404).json({ message: "Not found" });
  }

  exp.status = "rejected";
  await exp.save();

  res.json({ success: true });
};
