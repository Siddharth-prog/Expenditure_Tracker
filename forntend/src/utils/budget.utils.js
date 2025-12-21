export const calculateSpent = (categories) =>
  categories.reduce((sum, c) => sum + c.spent, 0);
