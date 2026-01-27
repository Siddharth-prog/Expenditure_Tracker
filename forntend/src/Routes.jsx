// src/routes.jsx
import { Routes, Route } from "react-router-dom";

/* Public */
import Home from "./public/Home.jsx";

/* Auth */
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import ForgotPassword from "./pages/auth/ForgotPassword.jsx";
import ResetPassword from "./pages/auth/ResetPassword.jsx";
import SetPassword from "./pages/auth/SetPassword.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import DailyReview from "./pages/dashboard/DailyReview.jsx";
import MonthlyReview from "./pages/dashboard/MonthlyReview.jsx";
import AllocateBudget from "./pages/dashboard/AllocateBudget.jsx";
import YearlyReview from "./pages/dashboard/YearlyReview.jsx";
import Expenses from "./pages/dashboard/Expenses.jsx";
import Savings from "./pages/dashboard/Savings.jsx";
import MonthlyPlan from "./pages/dashboard/MonthlyPlan.jsx";
import VerifyEmail from "./pages/auth/verifyEmail.jsx";
import VerifyEmailCallback from "./pages/auth/verifyEmailCallback.jsx";
import Trips from "./pages/trips/Trips.jsx";
import TripDetails from "./pages/trips/TripDetails.jsx";

/* Future (after login) */
// import Dashboard from "./pages/dashboard/Dashboard";
// import ProtectedRoute from "./components/layout/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* ===== PUBLIC ROUTES ===== */}
      <Route path="/" element={<Home />} />

      {/* ===== AUTH ROUTES ===== */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/verify-email/callback" element={<VerifyEmailCallback />} />
      {/* After OAuth → force password setup */}
      <Route path="/set-password" element={<SetPassword />} />

     
      <Route path="/dashboard" element={ <Dashboard /> }/>
      <Route path="/dashboard/daily" element={<DailyReview />} />
       <Route path="/dashboard/monthly" element={<MonthlyReview />} />
        <Route path="/dashboard/yearly" element={<YearlyReview />} />
        <Route path="/dashboard/budget" element={<AllocateBudget />} />
        <Route path="/dashboard/expenses" element={<Expenses />} />
        <Route path="/dashboard/savings" element={<Savings />} />
        <Route path="/dashboard/monthly-plan" element={<MonthlyPlan/>}/>
        <Route path="/dashboard/trips" element={<Trips/>} />
        <Route path="/dashboard/trips/:id" element={<TripDetails />} />
    </Routes>
  );
}
