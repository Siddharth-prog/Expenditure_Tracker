// Hero.jsx
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="min-h-screen bg-bg flex items-center">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-14">

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <h1 className="text-5xl font-bold leading-tight text-textPrimary">
            Smarter money decisions,
            <span className="text-glow"> powered by AI</span>
          </h1>

          <p className="mt-6 text-lg text-textSecondary">
            Track spending, control budgets, and unlock intelligent insights that help you save more every month.
          </p>

          <div className="mt-10 flex gap-4">
            <a href="/register" className="relative bg-glow text-bg px-7 py-3 rounded-lg font-semibold overflow-hidden">
              <span className="relative z-10">Get Started</span>
              <span className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition" />
            </a>

            <a className="border border-border px-7 py-3 rounded-lg text-textSecondary hover:bg-surface transition">
              View Plans
            </a>
          </div>
        </motion.div>

        {/* Animated Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45 }}
          className="bg-surface border border-border rounded-2xl p-6"
        >
          <p className="text-textMuted">This Month</p>
          <p className="text-3xl font-bold text-textPrimary mt-2">
            ₹42,560
          </p>

          <div className="mt-4 h-2 rounded-full bg-border overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "68%" }}
              transition={{ duration: 0.8 }}
              className="h-full bg-glow"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
