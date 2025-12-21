// Features.jsx
const features = [
  "AI-based categorization",
  "Smart budget alerts",
  "Savings forecasting",
  "CSV & fixed expenses",
];

export default function Features() {
  return (
    <section id="features" className="py-28 bg-surface  hover:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-gray-100 text-center mb-14">
          Designed to feel effortless
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="
                bg-surface border border-border
                rounded-xl p-6
                hover:bg-surfaceHover hover:-translate-y-1
                transition-all duration-300
              "
            >
              <p className="text-textSecondary">{f}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
