import api from "./axios";

export const scanEmails = () => api.post("/ai/scan");

export const fetchPendingAIExpenses = () =>
  api.get("/ai/pending").then(r => r.data);

export const approveAIExpense = (id) =>
  api.post(`/ai/${id}/approve`);

export const rejectAIExpense = (id) =>
  api.post(`/ai/${id}/reject`);
