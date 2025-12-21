import DashboardNavbar from "../../components/dashboard/DashboardNavbar";
import SavingsSummary from "../../components/dashboard/SavingsSummary";

export default function Savings() {
  return (
    <div className="bg-bg min-h-screen">
      <DashboardNavbar />

      <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
        <h2 className="text-2xl font-semibold">Savings</h2>

        {/* GET /api/savings */}
        <SavingsSummary />
      </div>
    </div>
  );
}
