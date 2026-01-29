import { Link, useParams } from 'react-router-dom';
import { useTripExpenses } from '../../hooks/trips/useTripExpenses';
import { useTripsSummary } from '../../hooks/trips/useTripsSummary';
import AddTripExpense from './AddTripExpense';
import AddTripMember from './AddTripMembers';
import { useTrip } from '../../hooks/trips/useTrip';
import { useEndTrip } from '../../hooks/trips/useEndTrips';
import TripBalanceCards from './TripBalanceCard';
export default function TripDetails() {
  const { id } = useParams();
  const endTrip = useEndTrip(id);
  const { data: trip } = useTrip(id);
  const { data: expenses = [] } = useTripExpenses(id);
  const { data: summary } = useTripsSummary(id);

  if (!trip) return null;

  if (!id) {
    console.error('Trip ID missing from route');
    return null;
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link to="/dashboard/trips" className="text-sm text-glow hover:underline">
          ← Back to Trips
        </Link>

        <div className="flex items-center gap-4">
          <span className="text-sm text-textMuted">{trip.members.length} members</span>

          {trip.status === 'active' && (
            <button
              className="text-sm text-danger border border-danger px-3 py-1 rounded-lg"
              disabled={endTrip.isLoading}
              onClick={() => {
                const ok = window.confirm('End this trip? It will be archived.');
                if (ok) {
                  endTrip.mutate(id); // ✅ PASS ID HERE
                }
              }}
            >
              End Trip
            </button>
          )}
        </div>
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
              <p className="text-textMuted text-sm">No expenses added yet.</p>
            ) : (
              <div className="space-y-3">
                {expenses.map((e) => (
                  <div
                    key={e._id}
                    className="flex justify-between items-center text-sm border-b border-border pb-2 last:border-none"
                  >
                    <div>
                      <p className="font-medium">{e.title}</p>
                      <p className="text-xs text-textMuted">
                        Paid by <span className="font-medium">{e.paidBy}</span>
                        {' • '}
                        Split between {e.splitBetween.length} people
                      </p>
                    </div>

                    <p className="font-semibold text-glow">₹{e.amount}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SETTLEMENT */}
          {summary?.balances && (
            <div className="bg-surface border border-border rounded-2xl p-5">
              <h3 className="font-semibold mb-4">Per-User Balance</h3>
              <TripBalanceCards balances={summary.balances} />
            </div>
          )}
        </div>

        {/* RIGHT: MEMBERS */}
        <div className="space-y-4">
          {/* MEMBERS LIST */}
          <div className="bg-surface border border-border rounded-2xl p-5">
            <h3 className="font-semibold mb-3">Members</h3>

            <ul className="space-y-1 text-sm">
              {trip.members.map((m) => (
                <li key={m.name} className="flex items-center justify-between">
                  <span>{m.name}</span>
                  <span className="text-xs text-textMuted">included</span>
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
