// Known vendors (extend anytime)
export const KNOWN_VENDORS = [
  "amazon",
  "flipkart",
  "swiggy",
  "zomato",
  "uber",
  "ola",
  "netflix",
  "spotify",
  "airtel",
  "jio",
  "electricity",
  "water bill",
  "gas bill",
];

// Expense-intent keywords
export const EXPENSE_KEYWORDS = [
  "invoice",
  "receipt",
  "bill",
  "tax invoice",
  "payment successful",
  "amount paid",
  "total paid",
  "grand total",
];

// Words that indicate NON-expense emails
export const IGNORE_KEYWORDS = [
  "delivered",
  "out for delivery",
  "rate your order",
  "order delivered",
  "feedback",
  "review",
];


export const looksLikeExpense = (text = "") => {
  const t = text.toLowerCase();


  // ✅ known vendor
  if (KNOWN_VENDORS.some((v) => t.includes(v))) {
    return true;
  }

  // ✅ invoice/payment keywords
  if (EXPENSE_KEYWORDS.some((k) => t.includes(k))) {
    return true;
  }

  return false;
};


export const hasAmount = (text = "") => {
  const amountRegex =
    /((₹|rs\.?|inr)\s*)?\d{2,6}(\.\d{1,2})?\s*(paid|total|amount|grand)?/i;

  return amountRegex.test(text);
};
