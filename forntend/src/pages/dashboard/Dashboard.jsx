// src/pages/dashboard/Dashboard.jsx
import { Link } from "react-router-dom";
import DashboardNavbar from "../../components/dashboard/DashboardNavbar";
import UserProfileCard from "../../components/dashboard/UserProfileCard";
import OverviewCards from "../../components/dashboard/OverviewCards";
import ExpensePieChart from "../../components/dashboard/ExpensePieChart";
import AIInsights from "../../components/dashboard/AIInsights";
import AddExpense from "../../components/dashboard/AddExpense";
import BudgetSummary from "../../components/dashboard/BudgetSummary";

export default function Dashboard() {
  return (
    <div className="bg-bg min-h-screen">
      <DashboardNavbar />

      <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-8">
        {/* USER */}
        <UserProfileCard />

        {/* METRICS */}
        <OverviewCards />

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ExpensePieChart />
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

          <BudgetSummary />
        </div>

        {/* ACTIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AddExpense />

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
