import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import DashboardNavbar from "../../components/dashboard/DashboardNavbar";
import UserProfileCard from "../../components/dashboard/UserProfileCard";
import OverviewCards from "../../components/dashboard/OverviewCards";
import ExpensePieChart from "../../components/dashboard/ExpensePieChart";
import AIInsights from "../../components/dashboard/AIInsights";
import AddExpense from "../../components/dashboard/AddExpense";
import BudgetSummary from "../../components/dashboard/BudgetSummary";

import GmailConnectCard from "./GmailConnectCard";
import ManualGmailScan from "./ManualGmailScan";
import AIPendingExpenses from "../../components/ai/PendingAIExpense";

import { useDashboard } from "../../hooks/dashboard/useDashboard";
import CollapsibleSection from "../../components/layout/collapsible";

  export default function Dashboard() {
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  const [params] = useSearchParams();
  const qc = useQueryClient();

  useEffect(() => {
    if (params.get("gmail") === "connected") {
      qc.invalidateQueries(["dashboard"]);
    }
  }, [params, qc]);

  const { data, isLoading, isError } = useDashboard(month);

  if (isLoading || isError || !data) return null;

  const { user, monthlyPlan } = data;

  return (
    <div className="bg-bg min-h-screen">
      <DashboardNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">

        {/* Month Selector */}
        <div className="flex justify-end">
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="bg-surface border border-border rounded-lg px-3 py-2"
          />
        </div>

        {/* User */}
        <UserProfileCard user={user} />

        {/* OVERVIEW */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Overview</h2>
          <OverviewCards month={month} />
        </section>

        {/* CHART + AI */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ExpensePieChart month={month} />
          <CollapsibleSection title="AI Assistant"></CollapsibleSection>
          <AIInsights />
        </section>

        
        
          <div className=" flex-row">
            <GmailConnectCard connected={user.gmail?.connected} />
            <AIPendingExpenses month={month} />
          </div>
       

        {/* MONTHLY PLAN */}
        <section className="bg-surface border border-border rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Monthly Plan</h3>
            <Link
              to="/dashboard/monthly-plan"
              className="text-sm text-glow hover:underline"
            >
              Edit →
            </Link>
          </div>

          <BudgetSummary
            income={monthlyPlan.income}
            sections={monthlyPlan.sections}
          />
        </section>

        {/* ACTIONS */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AddExpense month={month} />

          
        </section>

        {/* QUICK LINKS */}
        <section className="bg-surface border border-border rounded-xl p-6">
          <h3 className="font-semibold mb-4">Quick Access</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
            <Link to="/dashboard/expenses" className="quick-link">📄 Expenses</Link>
            <Link to="/dashboard/daily" className="quick-link">📆 Daily</Link>
            <Link to="/dashboard/monthly" className="quick-link">📊 Monthly</Link>
            <Link to="/dashboard/yearly" className="quick-link">📈 Yearly</Link>
            <Link to="/dashboard/savings" className="quick-link">💰 Savings</Link>
          </div>
        </section>

      </div>
    </div>
  );
}
