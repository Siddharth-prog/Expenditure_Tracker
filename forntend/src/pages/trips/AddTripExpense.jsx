import { useEffect, useState } from "react";
import { useTrip } from "../../hooks/trips/useTrips";
import { useAddTripExpense } from "../../hooks/trips/useAddTrips";

export default function AddTripExpense({ tripId }) {
  const { data: trip } = useTrip(tripId);
  const addExpense = useAddTripExpense(tripId);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [splitBetween, setSplitBetween] = useState([]);

  /* ✅ SET DEFAULTS ONCE WHEN TRIP LOADS */
  useEffect(() => {
    if (!trip) return;

    // only set if empty (IMPORTANT)
    setPaidBy(prev => prev || trip.members[0]?.name || "");
    setSplitBetween(prev =>
      prev.length === 0
        ? trip.members.map(m => m.name)
        : prev
    );
  }, [trip]);

  const handleSubmit = () => {
    if (!title || !amount) return;

    addExpense.mutate({
      title,
      amount: Number(amount),
      paidBy,
      splitBetween,
    });

    setTitle("");
    setAmount("");
  };

  if (!trip) return null;

  return (
    <div className="bg-surface border  border-border rounded-2xl p-5 space-y-3">
      <h3 className="font-semibold">Add Expense</h3>

      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Expense title"
        className="text-black"
      />

      <input
        type="number"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        placeholder="Amount"
        className="text-black"
      />

      {/* PAID BY */}
      <select
        value={paidBy}
        onChange={e => setPaidBy(e.target.value)}
        className="text-slate-800"
      >
        {trip.members.map(m => (
          <option key={m.name} value={m.name}>
            {m.name}
          </option>
        ))}
      </select>

      {/* SPLIT BETWEEN */}
      <div className="flex flex-wrap gap-2 text-sm">
        {trip.members.map(m => (
          <label key={m.name} className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={splitBetween.includes(m.name)}
              onChange={() =>
                setSplitBetween(prev =>
                  prev.includes(m.name)
                    ? prev.filter(x => x !== m.name)
                    : [...prev, m.name]
                )
              }
            />
            {m.name}
          </label>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="bg-glow text-bg px-4 py-2 rounded"
      >
        Add Expense
      </button>
    </div>
  );
}
