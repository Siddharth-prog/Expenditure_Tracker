export const calculateNetBalances = (trip, expenses) => {
  const balances = {};

  // init
  trip.members.forEach(m => {
    balances[m.name] = 0;
  });

  for (const e of expenses) {
    const splitCount = e.splitBetween.length;
    const share = e.amount / splitCount;

    // paidBy gets full credit
    balances[e.paidBy] += e.amount;

    // everyone in split pays share
    e.splitBetween.forEach(name => {
      balances[name] -= share;
    });
  }

  return Object.entries(balances).map(([name, amount]) => ({
    name,
    amount: Math.round(amount),
  }));
};
