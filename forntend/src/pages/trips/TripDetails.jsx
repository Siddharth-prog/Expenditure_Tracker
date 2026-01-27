import { Link, useParams } from "react-router-dom";
import { useTripExpenses } from "../../hooks/trips/useTripExpenses";
import { useTripsSummary } from "../../hooks/trips/useTripsSummary";
import AddTripExpense from "./AddTripExpense";
import AddTripMember from "./AddTripMembers";
import { useTrip } from "../../hooks/trips/useTrips";

export default function TripDetails() {
  const { id } = useParams();

  const { data: trip } = useTrip(id);
  const { data: expenses = [] } = useTripExpenses(id);
  const { data: summary } = useTripsSummary(id);

  if (!trip) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <Link
          to="/dashboard/trips"
          className="text-sm text-glow hover:underline"
        >
          ← Back to Trips
        </Link>

        <span className="text-sm text-textMuted">
          {trip.members.length} members
        </span>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT: EXPENSES */}
        <div className="lg:col-span-2 space-y-6">

          {/* ADD EXPENSE */}
          <AddTripExpense tripId={id} />

          {/* EXPENSE LIST */}
          <div className="bg-surface border border-border rounded-2xl p-5">
            <h3 className="font-semibold mb-4">Expenses</h3>

            {expenses.length === 0 ? (
              <p className="text-textMuted text-sm">
                No expenses added yet.
              </p>
            ) : (
              <div className="space-y-3">
                {expenses.map(e => (
                  <div
                    key={e._id}
                    className="flex justify-between items-center text-sm border-b border-border pb-2 last:border-none"
                  >
                    <div>
                      <p className="font-medium">{e.title}</p>
                      <p className="text-xs text-textMuted">
                        Paid by <span className="font-medium">{e.paidBy}</span>
                        {" • "}
                        Split between {e.splitBetween.length} people
                      </p>
                    </div>

                    <p className="font-semibold text-glow">
                      ₹{e.amount}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SETTLEMENT */}
          {summary && (
            <div className="bg-surface border border-border rounded-2xl p-5">
              <h3 className="font-semibold mb-4">Settlement</h3>

              {summary.settlements.length === 0 ? (
                <p className="text-sm text-green-600">
                  🎉 All settled!
                </p>
              ) : (
                <div className="space-y-2">
                  {summary.settlements.map((s, i) => (
                    <div
                      key={i}
                      className="flex justify-between text-sm"
                    >
                      <span>
                        {s.from} → {s.to}
                      </span>
                      <span className="font-semibold">
                        ₹{s.amount}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* RIGHT: MEMBERS */}
        <div className="space-y-4">

          {/* MEMBERS LIST */}
          <div className="bg-surface border border-border rounded-2xl p-5">
            <h3 className="font-semibold mb-3">Members</h3>

            <ul className="space-y-1 text-sm">
              {trip.members.map(m => (
                <li
                  key={m.name}
                  className="flex items-center justify-between"
                >
                  <span>{m.name}</span>
                  <span className="text-xs text-textMuted">
                    included
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* ADD MEMBER */}
          <AddTripMember tripId={id} />
        </div>
      </div>
    </div>
  );
}
