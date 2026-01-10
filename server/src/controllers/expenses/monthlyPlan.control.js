import {
  getMonthlyPlan,
  saveMonthlyPlan,
  copyLastMonthPlan,
  getLockedSections,
} from "../../services/monthlyPlan.service.js";

export const fetchMonthlyPlan = async (req, res) => {
  const { month } = req.query;
  const plan = await getMonthlyPlan(req.user._id, month);
  res.json(plan);
};

export const upsertMonthlyPlan = async (req, res) => {
  const plan = await saveMonthlyPlan(req.user._id, req.body);
  res.json(plan);
};

export const copyLastMonth = async (req, res) => {
  const { month } = req.body;
  const plan = await copyLastMonthPlan(req.user._id, month);
  res.json(plan);
};

export const fetchLockedSections = async (req, res) => {
  const { month } = req.query;
  const locked = await getLockedSections(req.user._id, month);
  res.json(locked);
};
