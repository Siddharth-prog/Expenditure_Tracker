export default function OAuthButton() {
  const handleGoogleLogin = () => {
    // BACKEND:
    // GET /api/auth/google
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="
        w-full mt-4
        border border-border
        py-3 rounded-lg
        text-textSecondary
        hover:bg-surfaceHover
        transition
      "
    >
      Continue with Google
    </button>
  );
}
