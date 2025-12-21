// src/pages/dashboard/Dashboard.jsx
import { Link } from 'react-router-dom';
import AddExpense from '../../components/dashboard/AddExpense';
import AIInsights from '../../components/dashboard/AIInsights';
import BudgetSection from '../../components/dashboard/BudgetSectionCard';
import DashboardNavbar from '../../components/dashboard/DashboardNavbar';
import ExpensePieChart from '../../components/dashboard/ExpensePieChart';
import OverviewCards from '../../components/dashboard/OverviewCards';
import UserProfileCard from '../../components/dashboard/UserProfileCard';

export default function Dashboard() {
  return (
    <div className="bg-bg min-h-screen">
      {/* NAVBAR (responsive, post-login) */}
      <DashboardNavbar />

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-8">
        {/* USER INFO */}
        <UserProfileCard />

        {/* OVERVIEW METRICS */}
        <OverviewCards />

        {/* CHART + AI INSIGHTS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ExpensePieChart />
          <AIInsights />
        </div>

        {/* BUDGET OVERVIEW (SUMMARY) */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Budget Overview</h3>
            <Link to="/dashboard/budget" className="text-sm text-glow hover:underline">
              Manage Budgets →
            </Link>
          </div>

          <BudgetSection />
        </div>

        {/* QUICK ACTIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ADD EXPENSE */}
          <AddExpense />

          {/* QUICK LINKS */}
          <div className="bg-surface border border-border rounded-xl p-6">
            <h3 className="font-semibold mb-4">Quick Access</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <Link
                to="/dashboard/expenses"
                className="p-4 rounded-lg bg-bg hover:bg-surfaceHover transition"
              >
                📄 View Expenses
              </Link>

              <Link
                to="/dashboard/savings"
                className="p-4 rounded-lg bg-bg hover:bg-surfaceHover transition"
              >
                💰 Savings
              </Link>

              <Link
                to="/dashboard/daily"
                className="p-4 rounded-lg bg-bg hover:bg-surfaceHover transition"
              >
                📆 Daily Review
              </Link>

              <Link
                to="/dashboard/monthly"
                className="p-4 rounded-lg bg-bg hover:bg-surfaceHover transition"
              >
                📊 Monthly Review
              </Link>

              <Link
                to="/dashboard/yearly"
                className="p-4 rounded-lg bg-bg hover:bg-surfaceHover transition"
              >
                📈 Yearly Review
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
