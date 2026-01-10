// src/pages/dashboard/Dashboard.jsx
import { Link } from "react-router-dom";
import { useState } from "react";

import DashboardNavbar from "../../components/dashboard/DashboardNavbar";
import UserProfileCard from "../../components/dashboard/UserProfileCard";
import OverviewCards from "../../components/dashboard/OverviewCards";
import ExpensePieChart from "../../components/dashboard/ExpensePieChart";
import AIInsights from "../../components/dashboard/AIInsights";
import AddExpense from "../../components/dashboard/AddExpense";
import BudgetSummary from "../../components/dashboard/BudgetSummary";

import { useDashboard } from "../../hooks/dashboard/useDashboard";

export default function Dashboard() {
  // 📅 Month selector (default = current month)
  const [month, setMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

  const { data, isLoading, isError } = useDashboard(month);

  if (isLoading) {
    return (
      <div className="bg-bg min-h-screen flex items-center justify-center">
        <p className="text-textMuted">Loading dashboard…</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="bg-bg min-h-screen flex items-center justify-center">
        <p className="text-danger">Failed to load dashboard</p>
      </div>
    );
  }

  const { user, overview, pie, monthlyPlan } = data;

  return (
    <div className="bg-bg min-h-screen">
      <DashboardNavbar />

      <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-8">

        {/* 🔹 MONTH SELECTOR */}
        <div className="flex justify-end">
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="bg-surface border border-border rounded-lg px-3 py-2 text-textPrimary"
          />
        </div>

        {/* USER */}
        <UserProfileCard user={user} />

        {/* METRICS */}
        <OverviewCards month={month} />

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ExpensePieChart month={month} />
          <AIInsights />
        </div>

        {/* MONTHLY PLAN SUMMARY */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Monthly Plan Overview</h3>
            <Link
              to="/dashboard/monthly-plan"
              className="text-sm text-glow hover:underline"
            >
              Edit Monthly Plan →
            </Link>
          </div>

          <BudgetSummary sections={monthlyPlan.sections} />
        </div>

        {/* ACTIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AddExpense month={month} />

          <div className="bg-surface border border-border rounded-xl p-6">
            <h3 className="font-semibold mb-4">Quick Access</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <Link to="/dashboard/expenses" className="quick-link">
                📄 View Expenses
              </Link>
              <Link to="/dashboard/savings" className="quick-link">
                💰 Savings
              </Link>
              <Link to="/dashboard/daily" className="quick-link">
                📆 Daily Review
              </Link>
              <Link to="/dashboard/monthly" className="quick-link">
                📊 Monthly Review
              </Link>
              <Link to="/dashboard/yearly" className="quick-link">
                📈 Yearly Review
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
