// src/services/budget.service.js
import api from "../api/axios";

export const fetchBudgetSummary = async () => {
  // REAL BACKEND (later)
  // const res = await api.get("/budget/summary");
  // return res.data;

  // MOCK – always valid shape
  return [
    {
      section: "Lifestyle",
      limit: 20000,
      categories: [
        { name: "Food", spent: 3500 },
        { name: "Travel", spent: 1200 },
      ],
    },
    {
      section: "Essentials",
      limit: 30000,
      categories: [
        { name: "Rent", spent: 12000 },
        { name: "Utilities", spent: 2800 },
      ],
    },
  ];
};

export const updateSectionLimit = async ({ section, limit }) => {
  // return api.put(`/budget/section/${section}`, { limit });
};
