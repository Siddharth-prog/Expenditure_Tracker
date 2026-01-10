import { getDashboardData } from "../../services/dashboard.service.js";

export const dashboard = async (req, res) => {
  try {
    const userId = req.user?._id;
    const month = req.query.month;

    if (!month) {
      return res.status(400).json({
        message: "month query param is required (YYYY-MM)",
      });
    }

    const data = await getDashboardData(userId, month);
    return res.status(200).json(data);

  } catch (err) {
    console.error("DASHBOARD ERROR:", err);
    return res.status(500).json({
      message: err.message || "Dashboard failed",
    });
  }
};
