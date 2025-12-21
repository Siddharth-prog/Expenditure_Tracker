// Testimonials.jsx
const reviews = [
  { name: "Amit", text: "I finally know where my money goes." },
  { name: "Neha", text: "The AI insights are actually useful." },
];

export default function Testimonials() {
  return (
    <section id="reviews" className="py-28 bg-surface  hover:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl text-gray-100 font-semibold text-center mb-14">
          People love the clarity
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="bg-bg border border-border rounded-xl p-6"
            >
              <p className="text-textSecondary">“{r.text}”</p>
              <p className="mt-3 text-glow font-medium">
                {r.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
