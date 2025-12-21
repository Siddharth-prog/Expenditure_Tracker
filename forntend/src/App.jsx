import PublicNavbar from "./components/layout/PublicNavbar.jsx";
import Home from "./public/Home.jsx";
import AppRoutes from "./Routes.jsx";

export default function App() {
  return (
     <div className="dark bg-bg text-textPrimary min-h-screen">
      <AppRoutes />
    </div>
  );
}
