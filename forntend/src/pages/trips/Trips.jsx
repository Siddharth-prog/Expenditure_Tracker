import { Link } from "react-router-dom";
import { useTrip } from "../../hooks/trips/useTrips";
import CreateTripModal from "./CreateTripModal";

export default function Trips() {
  const { data = [], isLoading } = useTrip();

  if (isLoading) {
    return (
      <div className="p-6 text-textMuted">
        Loading trips…
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-semibold">👥 Friend Splits</h2>
        <CreateTripModal />
      </div>

      {/* Trips Grid */}
      {data.length === 0 ? (
        <div className="text-center py-12 text-textMuted">
          No trips yet. Create your first split 🚀
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map(trip => (
            <Link
              key={trip._id}
              to={`/dashboard/trips/${trip._id}`}
              className="group bg-surface border border-border rounded-2xl p-5 hover:border-glow transition"
            >
              <div className="flex justify-between items-start">
                <h3 className="font-semibold group-hover:text-glow">
                  {trip.title}
                </h3>

                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    trip.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {trip.status}
                </span>
              </div>

              <p className="text-xs text-textMuted mt-2">
                Members: {trip.members.length}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
