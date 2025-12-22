import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button onClick={() => setOpen(!open)}>☰</button>

      {open && (
        <div className="absolute right-4 top-14 bg-surface border border-border rounded-xl p-4 flex flex-col gap-3">
          <NavLink to="/dashboard">Overview</NavLink>
          <NavLink to="/dashboard/daily">Daily</NavLink>
          <NavLink to="/dashboard/monthly">Monthly</NavLink>
          <NavLink to="/dashboard/yearly">Yearly</NavLink>
          <NavLink to="/dashboard/budget">Budgets</NavLink>
          <NavLink to="/dashboard/monthly-plan">Monthly Plan</NavLink>
        </div>
      )}
    </div>
  );
}
