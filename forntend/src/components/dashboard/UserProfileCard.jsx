export default function UserProfileCard() {
  // GET /api/user/profile
  const user = {
    name: "Siddharth Gupta",
    email: "sid@gmail.com",
    plan: "Pro",
  };

  return (
    <div className="bg-surface border border-border rounded-xl p-5">
      <p className="text-textMuted text-sm">Logged in as</p>
      <p className="text-textPrimary font-semibold mt-1">
        {user.name}
      </p>
      <p className="text-textSecondary text-sm">
        {user.email}
      </p>
      <span className="inline-block mt-2 text-xs bg-glow/20 text-glow px-2 py-1 rounded">
        {user.plan}
      </span>
    </div>
  );
}
