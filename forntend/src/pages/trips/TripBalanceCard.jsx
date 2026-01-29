export default function TripBalanceCards({ balances }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {balances.map(b => {
        const isPositive = b.amount > 0;
        const isNegative = b.amount < 0;

        return (
          <div
            key={b.name}
            className={`rounded-xl p-4 border flex justify-between items-center
              ${
                isPositive
                  ? "bg-green-50 border-green-300 text-green-700"
                  : isNegative
                  ? "bg-red-50 border-red-300 text-red-700"
                  : "bg-gray-50 border-gray-300 text-gray-600"
              }`}
          >
            <span className="font-medium">{b.name}</span>

            <span className="font-semibold">
              {isPositive && "+"}
              ₹{Math.abs(b.amount)}
            </span>
          </div>
        );
      })}
    </div>
  );
}
