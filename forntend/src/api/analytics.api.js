import api from "./axios";

export const fetchDailyAnalytics = (month) =>
  api.get("/analytics/daily", { params: { month } }).then(r => r.data);

export const fetchMonthlyAnalytics = (month) =>
  api.get("/analytics/monthly", { params: { month } }).then(r => r.data);

export const fetchYearlyAnalytics = (year) =>
  api.get("/analytics/yearly", { params: { year } }).then(r => r.data);
