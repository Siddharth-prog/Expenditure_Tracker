import api from "./axios";

export const fetchMonthlyPlan = (month) =>
  api.get("/monthly-plan", { params: { month } }).then(r => r.data);

export const saveMonthlyPlan = (payload) =>
  api.post("/monthly-plan", payload);

export const copyLastMonth = (month) =>
  api.post("/monthly-plan/copy", { month });

export const fetchLockedSections = (month) =>
  api.get("/monthly-plan/locked", { params: { month } }).then(r => r.data);
