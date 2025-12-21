// PublicNavbar.jsx
import { motion } from "framer-motion";

export default function PublicNavbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="sticky top-0 z-50 bg-bg/90 backdrop-blur border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src="/logo.png" className="w-8 h-8" />
          <span className="text-textPrimary font-semibold text-lg">
            ExpenseAI
          </span>
        </div>

        {/* Nav */}
        <nav className="flex gap-8 text-sm text-textSecondary">
          {["Features", "Pricing", "Reviews"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="relative hover:text-textPrimary transition"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-glow transition-all hover:w-full" />
            </a>
          ))}

          <a
            href="/login"
            className="text-glow font-medium"
          >
            Sign In
          </a>
        </nav>
      </div>
    </motion.header>
  );
}
