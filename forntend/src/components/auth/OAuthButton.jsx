export default function OAuthButton() {
  const handleGoogleLogin = () => {
    window.location.href =
      import.meta.env.VITE_API_URL + "/auth/google";
  };

  return (
    <button
      type="button"
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
