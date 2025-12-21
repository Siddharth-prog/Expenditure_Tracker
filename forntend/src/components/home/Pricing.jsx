// Pricing.jsx
import { motion } from "framer-motion";

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-surface hover:bg-gray-900">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-semibold text-gray-100 mb-12">Pricing</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {["Free", "Pro", "Enterprise"].map((plan, i) => (
            <motion.div
              key={plan}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              viewport={{ once: true }}
              className="bg-surface border border-border rounded-xl p-6"
            >
              <h3 className="text-xl text-blue-500 font-semibold">{plan}</h3>
              <p className="text-gray-100 mt-3">
                {plan === "Free" ? "Basic tracking" : "Advanced AI insights"}
              </p>

              <button className="mt-6 w-full bg-blue-500 hover:cursor-pointer hover:font-bold hover:bg-blue-600 py-2 rounded-lg">
                Choose Plan
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
