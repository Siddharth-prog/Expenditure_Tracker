// src/utils/groupExpenses.js
export const groupByDay = (expenses) =>
  expenses.reduce((acc, e) => {
    const day = new Date(e.date).toISOString().slice(0, 10);
    acc[day] ??= [];
    acc[day].push(e);
    return acc;
  }, {});
