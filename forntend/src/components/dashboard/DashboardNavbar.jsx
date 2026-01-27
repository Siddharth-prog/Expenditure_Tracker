import { NavLink } from "react-router-dom";
import MobileNav from "./MobileNav";

export default function DashboardNavbar() {
  return (
    <header className="sticky top-0 z-50 bg-bg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <span className="font-semibold text-textPrimary text-lg">
          ExpenseAI
        </span>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-sm">
          <NavLink to="/dashboard">Overview</NavLink>
          <NavLink to="/dashboard/daily">Daily</NavLink>
          <NavLink to="/dashboard/monthly">Monthly</NavLink>
          <NavLink to="/dashboard/yearly">Yearly</NavLink>
          <NavLink to="/dashboard/budget">Budgets</NavLink>
          <NavLink to="/dashboard/monthly-plan">Monthly Plan</NavLink>
          <NavLink to="/dashboard/trips">Splits</NavLink>

        </nav>

        {/* Mobile Nav */}
        <MobileNav />
      </div>
    </header>
  );
}
