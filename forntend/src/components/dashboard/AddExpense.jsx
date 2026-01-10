import { useState } from "react";
import { useAddExpense } from "../../hooks/expense/useAddExpense";

export default function AddExpense({ month }) {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    section: "",
    category: "",
    date: new Date().toISOString().slice(0, 10),
  });

  const { mutate, isLoading } = useAddExpense(month);

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const submit = () => {
    if (!form.title || !form.amount || !form.section) return;

    mutate(
      { ...form, amount: Number(form.amount) },
      {
        onSuccess: () => {
          setForm((p) => ({
            ...p,
            title: "",
            amount: "",
            category: "",
          }));
        },
      }
    );
  };

  const inputClass = `
    w-full px-3 py-2 rounded-lg
    bg-bg
    text-textPrimary
    placeholder:text-textMuted
    border border-border
    focus:outline-none focus:ring-2 focus:ring-glow
  `;

  return (
    <div className="bg-surface border border-border rounded-xl p-5">
      <h3 className="font-semibold mb-4 text-textPrimary">
        Add Expense
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className={inputClass}
        />

        <input
          name="amount"
          type="number"
          value={form.amount}
          onChange={handleChange}
          placeholder="Amount"
          className={inputClass}
        />

        <input
          name="section"
          value={form.section}
          onChange={handleChange}
          placeholder="Section (e.g. Lifestyle)"
          className={inputClass}
        />

        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category (e.g. Food)"
          className={inputClass}
        />

        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <button
        onClick={submit}
        disabled={isLoading}
        className="
          mt-4
          bg-glow text-bg
          px-6 py-2 rounded-lg
          disabled:opacity-60
        "
      >
        {isLoading ? "Adding..." : "Add Expense"}
      </button>
    </div>
  );
}
