// src/api/expense.api.js
import api from "./axios";

export const fetchExpenses = async (month) => {
  const res = await api.get("/expenses", {
    params: month ? { month } : {},
  });
  return res.data;
};

export const addExpense = async (data) => {
  const res = await api.post("/expenses", data);
  return res.data;
};

export const updateExpense = async ({ id, ...data }) => {
  const res = await api.put(`/expenses/${id}`, data);
  return res.data;
};

export const deleteExpense = async (id) => {
  await api.delete(`/expenses/${id}`);
};

export const importExpensesCSV = async (formData) => {
  const res = await api.post("/expenses/import", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};
