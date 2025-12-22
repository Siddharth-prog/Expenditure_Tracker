import api from "../api/axios";

export const fetchMonthlyPlan = async () => {
  // return api.get("/monthly-plan?month=2025-01").then(res => res.data);

  return {
    income: 50000,
    divisions: [
      { name: "Essentials", allocated: 30000 },
      { name: "Lifestyle", allocated: 15000 },
    ],
  };
};

export const fetchExpenses = async () => {
  // return api.get("/expenses?month=2025-01").then(res => res.data);

  return [
    { amount: 500, category: "Food", division: "Lifestyle" },
    { amount: 3000, category: "Travel", division: "Lifestyle" },
    { amount: 12000, category: "Rent", division: "Essentials" },
  ];
};

export const updateSectionLimit = async ({ section, limit }) => {
  // return api.put(`/monthly-plan/division/${section}`, { allocated: limit });
};

export const addExpense = async (expense) => {
  // return api.post("/expenses", expense);
};
