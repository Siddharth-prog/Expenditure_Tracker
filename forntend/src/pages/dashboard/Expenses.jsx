import DashboardNavbar from "../../components/dashboard/DashboardNavbar";
import ExpenseList from "../../components/dashboard/ExpenseList";

export default function Expenses() {
  return (
    <div className="bg-bg min-h-screen">
      <DashboardNavbar />

      <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
        <h2 className="text-2xl font-semibold">Your Expenses</h2>

        {/* GET /api/expenses */}
        <ExpenseList />
      </div>
    </div>
  );
}
