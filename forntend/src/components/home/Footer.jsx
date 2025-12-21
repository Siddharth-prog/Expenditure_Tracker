// Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-bg border-t border-border py-14">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-10 text-sm">
        <div>
          <h3 className="text-textPrimary font-semibold">ExpenseAI</h3>
          <p className="text-textMuted mt-2">
            Intelligent finance control
          </p>
        </div>
        <div><a href="#features">Features</a></div>
        <div><a href="#pricing">Pricing</a></div>
        <div><a href="#reviews">Reviews</a></div>
      </div>
    </footer>
  );
}
