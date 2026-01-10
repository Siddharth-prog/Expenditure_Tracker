// src/api/dashboard.api.js
import api from "./axios";

export const fetchDashboard = async (month) => {
  const res = await api.get("/dashboard", {
    params: { month },
  });
  return res.data;
};
