import { useState } from 'react';
import { useEditExpense } from '../../hooks/expense/useEditExpense';

export default function EditExpenseForm({ expense, month, onClose }) {
  const [form, setForm] = useState({
    title: expense.title,
    amount: expense.amount,
    section: expense.section,
    category: expense.category,
    date: expense.date.slice(0, 10),
  });

  const { mutate, isLoading } = useEditExpense(month);

  const submit = () => {
    console.log('EDIT SUBMIT CLICKED', expense._id);

    mutate(
      {
        id: expense._id,
        data: {
          ...form,
          amount: Number(form.amount),
        },
      },
      {
        onSuccess: () => {
          console.log('EDIT SUCCESS');
          onClose();
        },
        onError: (err) => {
          console.error('EDIT ERROR', err.response?.data || err.message);
        },
      }
    );
  };

  return (
    <div className="bg-bg p-4 rounded-xl border space-y-2">
      <input
        className="text-black"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <input
        className="text-black"
        type="number"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
      />
      <input
        className="text-black"
        value={form.section}
        onChange={(e) => setForm({ ...form, section: e.target.value })}
      />
      <input
        className="text-black"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />
      <input
        className="text-black"
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />

      <div className="flex gap-2">
        <button onClick={submit} disabled={isLoading} className="bg-glow px-4 py-2 rounded">
          {isLoading ? 'Saving...' : 'Save'}
        </button>

        <button onClick={onClose} className="text-sm text-textMuted">
          Cancel
        </button>
      </div>
    </div>
  );
}
