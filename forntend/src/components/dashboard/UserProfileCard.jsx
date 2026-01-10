export default function UserProfileCard({ user }) {
  const initials = user?.name
    ?.split(" ")
    .map(w => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">

      {/* Gradient Accent */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-green-400 to-emerald-600" />

      {/* Profile Row */}
      <div className="flex items-center gap-4 mt-2">
        {/* Avatar */}
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-600/20 text-green-500 text-xl font-bold">
          {initials}
        </div>

        {/* User Info */}
        <div>
          <p className="text-2xl font-semibold text-textPrimary transition">
            {user.name}
          </p>
          <p className="text-sm text-textSecondary">
            {user.email}
          </p>
        </div>
      </div>

      {/* Plan Badge */}
      <div className="mt-5">
        <span className="inline-flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-1.5 text-xs font-medium text-green-500">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          {user.plan} Plan
        </span>
      </div>
    </div>
  );
}
