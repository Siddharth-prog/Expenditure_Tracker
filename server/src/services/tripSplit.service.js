export const calculateSplit = (expenses, members) => {
  const balance = {};

  members.forEach(m => (balance[m] = 0));

  for (const e of expenses) {
    const share = e.amount / e.splitBetween.length;

    // payer gets credit
    balance[e.paidBy] += e.amount;

    // split members get debited
    e.splitBetween.forEach(m => {
      balance[m] -= share;
    });
  }

  return balance;
};

/* MINIMIZE TRANSACTIONS */
export const settleBalances = (balance) => {
  const debtors = [];
  const creditors = [];

  Object.entries(balance).forEach(([name, amt]) => {
    if (amt < 0) debtors.push({ name, amt: -amt });
    if (amt > 0) creditors.push({ name, amt });
  });

  const settlements = [];

  let i = 0, j = 0;
  while (i < debtors.length && j < creditors.length) {
    const pay = Math.min(debtors[i].amt, creditors[j].amt);

    settlements.push({
      from: debtors[i].name,
      to: creditors[j].name,
      amount: Math.round(pay),
    });

    debtors[i].amt -= pay;
    creditors[j].amt -= pay;

    if (debtors[i].amt === 0) i++;
    if (creditors[j].amt === 0) j++;
  }

  return settlements;
};
