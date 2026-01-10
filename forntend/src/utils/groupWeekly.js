// src/utils/groupWeekly.js
export const groupByWeek = (expenses) =>
  expenses.reduce((acc, e) => {
    const d = new Date(e.date);
    const week = `${d.getFullYear()}-W${Math.ceil(d.getDate() / 7)}`;
    acc[week] ??= [];
    acc[week].push(e);
    return acc;
  }, {});
